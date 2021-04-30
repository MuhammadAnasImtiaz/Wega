using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.Extensions.Logging;

namespace API.Data
{
    public class AppContextSeed
    {
        public static async Task SeedAsync(AppDbContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.Makes.Any())
                {
                    var makesData = File.ReadAllText("./Data/SeedData/makes.json");
                    var makes = JsonSerializer.Deserialize<List<Make>>(makesData);

                    foreach (var item in makes)
                    {
                        context.Makes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Models.Any())
                {
                    var modelsData = File.ReadAllText("./Data/SeedData/models.json");
                    var models = JsonSerializer.Deserialize<List<Model>>(modelsData);

                    foreach (var item in models)
                    {
                        context.Models.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                 if (!context.Features.Any())
                {
                    var featuresData = File.ReadAllText("./Data/SeedData/features.json");
                    var features = JsonSerializer.Deserialize<List<Feature>>(featuresData);

                    foreach (var item in features)
                    {
                        context.Features.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<AppDbContext>();
                logger.LogError(ex.Message);
            }
        }
    }
}