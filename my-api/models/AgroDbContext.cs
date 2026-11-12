using Microsoft.EntityFrameworkCore;

namespace ZariaAgroFresh.API.Models
{
    public class AgroDbContext : DbContext
    {
        public AgroDbContext(DbContextOptions<AgroDbContext> options) : base(options) { }

        public DbSet<ProduceItem> ProduceItems => Set<ProduceItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProduceItem>().HasData(
                new ProduceItem { Id = 1, CategoryId = 1, Name = "Abuja Puna White Yam (3 Tubers)", Sku = "TUB-YAM3", Description = "Large, starchy farm-harvested white yams ideal for boiling or pounding.", Price = 7500, IsAvailable = true },
                new ProduceItem { Id = 2, CategoryId = 1, Name = "Orange-Fleshed Sweet Potatoes (5kg)", Sku = "TUB-POT5", Description = "Nutrient-rich, naturally sweet potatoes freshly dug and cured.", Price = 3200, IsAvailable = true },
                new ProduceItem { Id = 3, CategoryId = 1, Name = "Ofada Local Brown Rice (5kg Bag)", Sku = "GRN-OFA5", Description = "Stone-free unpolished aromatic local rice harvested this season.", Price = 6800, IsAvailable = true },
                new ProduceItem { Id = 4, CategoryId = 1, Name = "Yellow Hybrid Maize Grain (10kg)", Sku = "GRN-MAZ10", Description = "Sun-dried whole yellow corn kernels for milling or livestock feed.", Price = 5500, IsAvailable = true },
                new ProduceItem { Id = 5, CategoryId = 2, Name = "Roma Plum Tomatoes (2kg Basket)", Sku = "VEG-TOM2", Description = "Firm, vine-ripened plum tomatoes harvested at dawn.", Price = 2400, IsAvailable = true },
                new ProduceItem { Id = 6, CategoryId = 2, Name = "Fluted Pumpkin Leaves / Ugu (Bundle)", Sku = "VEG-UGU1", Description = "Crisp, freshly cut organic green ugu leaves tied in farm bundles.", Price = 800, IsAvailable = true },
                new ProduceItem { Id = 7, CategoryId = 2, Name = "Tatashe Bell Peppers & Atarodo Mix (1kg)", Sku = "VEG-PEP1", Description = "Sweet red bell peppers paired with fiery scotch bonnet habaneros.", Price = 1500, IsAvailable = true },
                new ProduceItem { Id = 8, CategoryId = 2, Name = "Red Kaduna Onions (3kg Net)", Sku = "VEG-ONI3", Description = "Cured, pungent red onions with long shelf stability.", Price = 2600, IsAvailable = true },
                new ProduceItem { Id = 9, CategoryId = 3, Name = "Sweet Sugar Baby Watermelon (Whole)", Sku = "FRT-MEL1", Description = "Crisp, deep-red seedless-style watermelon ripened on the vine.", Price = 2200, IsAvailable = true },
                new ProduceItem { Id = 10, CategoryId = 3, Name = "Ripe Bananas & Plantain Bunch", Sku = "FRT-PLT1", Description = "Farm-ripened sweet bananas and green cooking plantains.", Price = 3500, IsAvailable = true },
                new ProduceItem { Id = 11, CategoryId = 3, Name = "MD2 Golden Pineapple (Pair)", Sku = "FRT-PIN2", Description = "Low-acid, extra-sweet golden pineapples harvested at peak ripeness.", Price = 2800, IsAvailable = true },
                new ProduceItem { Id = 12, CategoryId = 3, Name = "Alphonso & Julie Mangoes (2kg)", Sku = "FRT-MAN2", Description = "Fiberless, fragrant orchard mangoes picked fresh.", Price = 1900, IsAvailable = false },
                new ProduceItem { Id = 13, CategoryId = 4, Name = "Free-Range Farm Eggs (Crate of 30)", Sku = "PLR-EGG30", Description = "Large brown-shell eggs from pasture-raised laying hens.", Price = 5400, IsAvailable = true },
                new ProduceItem { Id = 14, CategoryId = 4, Name = "Dressed Broiler Chicken (2.2kg Whole)", Sku = "PLR-CHK2", Description = "Chilled, hygienically processed whole farm broiler.", Price = 6500, IsAvailable = true },
                new ProduceItem { Id = 15, CategoryId = 4, Name = "Raw Wildflower Farm Honey (500ml)", Sku = "DRY-HON5", Description = "Unfiltered, pure golden honey harvested from orchard hives.", Price = 4200, IsAvailable = true },
                new ProduceItem { Id = 16, CategoryId = 5, Name = "Hybrid Vegetable Seedling Tray (50 Cells)", Sku = "INP-SED50", Description = "Healthy tomato, pepper, and cabbage nursery transplants.", Price = 4500, IsAvailable = true },
                new ProduceItem { Id = 17, CategoryId = 5, Name = "Organic Poultry Compost Manure (25kg)", Sku = "INP-CMP25", Description = "Aged, pathogen-free organic fertilizer for high crop yield.", Price = 3000, IsAvailable = true }
            );
        }
    }
}