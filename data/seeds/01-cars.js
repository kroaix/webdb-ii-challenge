
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert([
        {
          id: 1,
          VIN: "1G4AH51N1K6437778",
          make: "Buick",
          model: "Sentry",
          mileage: 100
        },
        {
          id: 2,
          VIN: "1FTJW36F2TEA03179",
          make: "Ford",
          model: "F 350",
          mileage: 200
        },
        { id: 3, VIN: "JH4KA3240HC002301",  make: "Acura",
          model: "Legend",
          mileage: 200 }
      ]);
    });
};
