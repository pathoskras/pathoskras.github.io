/* global images */

console.log("Loaded wrapper.ts");

const md = new showdown.Converter({ openLinksInNewWindow: true });

function welcome() {
  hideEverything();

  $("#contentBox").html(md.makeHtml(`#KRas Interactive Resource
    
#What is K-Ras?

K-Ras is a protein that forms part of a cell signalling pathway. This pathway instructs your cells to grow and divide or to mature and take on specialised functions. To stop these pathways functioning when not needed, K-Ras is bound to a regulating switch that keeps it turned off. In order for K-Ras to send signals, it needs to be turned on. To do this, the regulating switch is swapped for an ‘on-switch’. K-Ras is then active and can send signals for cells to grow, divide or mature. When no longer required, the K-Ras protein is turned off again by cleaving the on-switch, converting it back to the inactive state. When K-Ras is switched off, it cannot send signals.

#What Goes Wrong with K-Ras?
Changes in the genetic code for K-Ras have the potential to cause normal cells to become cancerous. One such change leads to a swap of the amino acid glycine for cystine at position 12 in the K-Ras protein. This change in K-Ras is known as a ‘G12C’ mutation. A G12C mutation is acquired during a person's lifetime; it is not inherited. This change results in a K-Ras protein that is constantly switched on. The result is that affected cells are directed to grow and divide out of control, leading to tumour formation.

#K-Ras and Cancer
KRAS mutations occur in 17-25% of all human cancers. Furthermore, the G12C mutation accounts for about 44% of all KRAS mutations. Indeed, in non-small cell lung carcinoma, which is the most commonly occurring form of lung cancer, 13% of patients have this G12C mutation. The G12C mutation also occurs in 1-3% of colorectal and pancreatic cancer patients.

#Treating Mutant G12C K-Ras
Despite a significant number of lung and colorectal cancer patients affected by the G12C mutation, developing effective treatments has proven challenging. It has been difficult to find an area on the surface of the K-Ras protein where a drug might get a foothold to disrupt the unchecked cell division. Recently, however, a couple of inhibitors have been developed that lock the G12C mutant K-Ras protein in the inactive state, without affecting the normal function of unmutated K-Ras. These inhibitors show great potential for the treatment of G12C mutant K-Ras cancers.

#Link to Protein Databank:
[Mutant KRAS interacting with AMG 510](https://www.rcsb.org/pdb/explore/jmol.do?structureId=6oim&bionumber=1&jmolMode=HTML5)

#The Role of K-Ras in Cancer video:`)).append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/pD5q4TlZW-M?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
}

let currentScreen = null;
welcome();

function hideEverything() {
  $("#contentBox").html("");
  d3.selectAll(".bigText").classed("hidden", true);
  d3.selectAll(".drawer").classed("hidden", true);
  d3.select("#noteBox").classed("hidden", true);
  d3.select("#emailForm").classed("hidden", true);
  d3.select("#imageTitle").classed("hidden", true);

  if (currentScreen) {
    console.log("saving data for " + currentScreen);
    console.log(drawing_data.lines);
    images[currentScreen].lines = drawing_data.lines.map(d => {
      return {
        points: d.points,
        color: d.color
      };
    });

    $("#lineData").val(JSON.stringify(images));
  } else {
    console.log("Not on a screen to save..?");
  }

}

function openScreen(id) {
  hideEverything();
  d3.select("#noteBox").classed("hidden", false);
  const blob = drawing_data = images[id],
    image = blob.image;
  currentScreen = id;

  d3.select("#imageTitle").classed("hidden", false).text(blob.name);

  paint(drawing_data);

  d3.select(".drawer").classed("hidden", false);
  d3.select("#d3-background-image").attr("src", `/images/${image}`);



  var div = d3.select("#contentBox").append("div");
  div.append("img").attrs({
    class: "bigImage",
    src: `/images/${image}`
  });
  div2 = d3.select("#contentBox").append("div");
  { { !div2.append("h3").text("Notes:"); } }
  d3.select(`#text-${id}`).classed("hidden", false);

  {
    {
      !div2.append("textarea").attrs({
        class: "bigText"
      });
    }
  }
}

function email() {
  hideEverything();
  d3.select("#emailForm").classed("hidden", false);
}
