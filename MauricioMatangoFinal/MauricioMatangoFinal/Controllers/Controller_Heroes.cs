using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.Data;
using MauricioMatangoFinal.Models;

namespace MauricioMatangoFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Controller_Heroes : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public Controller_Heroes(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.Heroe";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("HeroTourAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myComand = new SqlCommand(query, myCon))
                {
                    myReader = myComand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from dbo.Heroe
                                where id = " + id + @"
                                ";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("HeroTourAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open(); ;
                using (SqlCommand myComand = new SqlCommand(query, myCon))
                {
                    myReader = myComand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        
        
    }
}