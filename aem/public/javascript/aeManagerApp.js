function predicatBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}

function replaceBadNames(items)
{
    var arrayLength = items.length;
    var badNames = {
        "AppEng.Blocks.Cable.name": "ME Cable",
        "AppEng.Blocks.Interface.name": "ME Interface",
        "AppEng.Blocks.Cable.name - AppEng.Colors.Yellow": "ME Cable - Yellow",
        "AppEng.Materials.ConversionMatrix.name": "Conversion Matrix",
        "AppEng.Materials.FluxQuartzDust.name": "Fluix Dust",
        "AppEng.Materials.MEBlankPattern.name": "ME Blank Pattern",
        "AppEng.Materials.QuartzCrystal.name": "Certus Quartz",
        "AppEng.Materials.QuartzDust.name": "Certus Quartz Dust",
        "AppEng.Materials.QuartzDustNether.name": "Nether Quartz Dust",
        "blockColouredPowder.white.name": "White Condensed Coloured Powder",
        "blockLayout.white.name": "White Layout Block",
        "item.AdamantineIngot.name": "Adamantine Ingot",
        "item.AngmallenIngot.name": "Agmallen Ingot",
        "item.BronzeIngot.name": "Bronze Ingot",
        "item.CopperIngot.name": "Copper Ingot",
        "item.CropEssence.dye.name": "Dye Essence",
        "item.CropEssence.nether.name": "Nether Essence",
        "item.ElectrumIngot.name": "Electrum Ingot",
        "item.FoodProduce.sweetcorn.name": "Sweetcorn Cob",
        "item.ManganeseIngot.name": "Manganese Ingot",
        "item.Metallurgy:Nether/VyroxeresBoots.name": "Vyroxeres Boots",
        "item.Metallurgy:Nether/VyroxeresChest.name": "Vyroxeres Chest",
        "item.Metallurgy:Nether/VyroxeresHelmet.name": "Vyroxeres Helmet",
        "item.Metallurgy:Nether/VyroxeresLegs.name": "Vyroxeres Legs",
        "item.Metallurgy:Utility/Saltpeter.name": "Saltpeter",
        "item.MithrilIngot.name": "Mithril Ingot",
        "item.OrichalcumIngot.name": "Orichalcum Ingot",
        "item.PortalDust.name": "Ender Pearl Dust",
        "item.SeedsBlackberry.name": "Blackberry Seeds",
        "item.SeedsChili.name": "Chilli Seeds",
        "item.SeedsChili.name": "Grape Seeds",
        "item.SeedsRaspberry.name": "Raspberry Seeds",
        "item.SeedsSweetcorn.name": "Sweetcorn Seeds",
        "item.SeedsTomato.name": "Tomato Seeds",
        "item.SilverIngot.name": "Silver Ingot",
        "item.SteelIngot.name": "Steel Ingot",
        "item.TinIngot.name": "Tin Ingot",
        "item.VulcaniteIngot.name": "Vulcanite Ingot",
        "item.VyroxeresDust.name": "Vyroxeres Dust",
        "item.VyroxeresIngot.name": "Vyroxeres Ingot",
        "item.ZincIngot.name": "Zinc Ingot",
        "item.diamondGearItem": "Diamond Gear",
        "item.dustCyanite.name": "Cyanite Dust",
        "item.e_gem.e_gemRuby.name": "Ruby",
        "item.e_gem.e_gemSapphire.name": "Sapphire",
        "item.extrautils:watering_can.name": "Watering Can",
        "item.ingotBlutonium.name": "Blutonium Ingot",
        "item.ingotCyanite.name": "Cyanite Ingot",
        "item.ingotGraphite.name": "Graphite Ingot",
        "item.ingotYellorium.name": "Yellorium Ingot",
        "item.ironGearItem": "Iron Gear",
        "item.SeedsGrape.name": "Grape Seeds",
        "item.itemwhitefence.name": "White Fence",
        "item.mSeedsGlowstone.name": "Glowstone Seeds",
        "item.mfr.plastic.raw.name": "Raw Plastic",
        "item.mfr.plastic.sheet.name": "Plastic Sheet",
        "item.mfr.rubber.bar.name": "Rubber Bar",
        "item.mfr.safarinet.singleuse.name": "Safari Net - Single Use",
        "item.nuggetForce.name": "Force Nugget",
        "item.rawLambchop.name": "Raw Lambchop",
    };
    for(var counter = 0; counter < arrayLength; counter++) {
        if(badNames[items[counter].name])
        {
            items[counter].name = badNames[items[counter].name]
        }
    }
    return items;
}

function update_stored(self, $http)
{
    $http.get('/stored/').then(function(response) {
        replaceBadNames(response.data);
        response.data.sort(predicatBy("name"));
        self.items = response.data;
    }, function(errResponse) {
        console.log('Error while fetching items');
    });
}
function update_stored_delay(self, $http)
{
        setTimeout(function() {
            update_stored(self, $http);
            update_stored_delay(self, $http);
        }, 10000);
}
angular.module('aeManagerApp', []).controller('MainCtrl', ['$http', function($http) {
    var self = this;
    update_stored(self, $http);

    update_stored_delay(self, $http);
}]);
