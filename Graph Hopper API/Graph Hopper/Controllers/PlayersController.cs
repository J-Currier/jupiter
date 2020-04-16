﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Graph_Hopper.Models;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace Graph_Hopper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly GraphHopperContext _context;

        public PlayersController(GraphHopperContext context)
        {
            _context = context;
        }

        // GET: api/Players
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            return await _context.Players.ToListAsync();
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(long id)
        {
            var player = await _context.Players.FindAsync(id);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }

        // GET: api/Players/=msn
        [HttpGet("={username}")]
        public async Task<ActionResult<Player>> GetPlayerByUserName(string username)
        {
            var players = await _context.Players.Where(p => p.UserName == username).ToListAsync();

            if (players.Count == 0)
            {
                return NotFound();
            }

            var player = players[0];
            
            player.LoginLast = DateTime.Now;
            _context.Entry(player).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return player;
        }

        // POST: api/Players/idToken
        [HttpPost("idToken")]
        public async Task<ActionResult<object>> GetPlayerByIdToken(GoogleToken token)
        {
            string GoogleApiTokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=";
            HttpClient client = new HttpClient();
            try
            {
                HttpResponseMessage response = await client.GetAsync(GoogleApiTokenInfoUrl + token.IdToken);
                var result = await response.Content.ReadAsStringAsync();
                
                if (!response.IsSuccessStatusCode)
                {
                    return result; // returns the error received from google, i.e. "invalid_token"
                }

                GoogleTokenInfo tokenInfo = JsonConvert.DeserializeObject<GoogleTokenInfo>(result);
               
                if (tokenInfo.iss != "accounts.google.com" && tokenInfo.iss != "https://accounts.google.com")
                {
                    return "Not issued by google";
                }

                if (tokenInfo.aud != "381072268579-0jo9s6uk126vi0hsc6rk52okmdvmkucm.apps.googleusercontent.com")
                {
                    return "Not issued from GraphHopper";
                }
                token.IdToken = null;
                token.UserName = tokenInfo.sub;
                return token;

            }
            catch (Exception error)
            {

                return error;
            }


        }
        // PUT: api/Players/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayer(long id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest();
            }

            _context.Entry(player).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Players
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
            _context.Players.Add(player);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlayer), new { id = player.Id }, player);
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Player>> DeletePlayer(long id)
        {
            var player = await _context.Players.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();

            return player;
        }

        private bool PlayerExists(long id)
        {
            return _context.Players.Any(e => e.Id == id);
        }
    }
}
