console.log('Loaded wrapper.ts')

type Point = [number, number]
type Line = {
  points : Point[];
  color : string;
}
type KrasImage = {
  id : number;
  image : string;
  lines : Line[];
  name : string;
}
declare let images: KrasImage[]

const md = new showdown.Converter({ openLinksInNewWindow: true })

const welcomeText = `##Welcome to the KRas Interactive Resource

#What is this Resource for?
This interactive resource is to help explain how changes in your cell messaging systems can lead to
cancer. It is specifically designed to assist those patients with cancer caused by alterations in a cell
messenger known as KRas. This specific alteration is known as G12C KRas and your doctor may have
spoken with you about this.

#Why have we created this Resource?
The purpose of this resource is to help patients better understand their particular cancer and how it
is caused and how specific treatments work. We hope this will increase patient knowledge and
confidence in making decisions about their treatment.

#How does this Resource Work?
This resource will be shown to you by your doctor or other clinical staff member.

The resource begins with some introductory information about KRas. This is followed by a video
animation explaining KRas biology and what can go wrong in cancer. There is also a model, which
shows how a treatment called AMG510 fits into altered KRas. Following is a series of six images that
your clinician can write on to explain your personal KRas story. This personalized information will be
sent to you by email, so that you can view it at a later time, show friends and family, even your GP.

Finally, there is a list of terms and definitions and some useful links.

#Who can I contact for further information about the Resource?
Please contact Dr Maja Divjak ([maja.divjak@petermac.org](mailto:maja.divjak@petermac.org?subject=KRAS%20Annotation)) for further assistance.
`;
const introductionText = `##Introduction to KRas
#What is KRas?
Cells are the basic building blocks of our body, making up our tissues and organs. The body constantly makes new cells to help us grow, replace worn out tissue and heal injuries. Normally, cells multiply and die in an orderly way, so that each new cell replaces one lost. There are special messengers that tell our cells how to do this. KRas is a messenger inside our cells that controls when cells multiply. When cells are not multiplying, KRas is switched off. When cells need to multiply, KRas is switched on and when no longer needed, it is switched off again.

#What Goes Wrong with KRas?
Alterations can occur in the KRas messenger. One particular alteration is known as a ‘G12C’ alteration. Your doctor may have mentioned this G12C alteration to you. The result of this alteration is that KRas is always switched on. The end result is that affected cells keep multiplying out of control, forming a mass or lump called a tumour.

#G12C KRas and Cancer
KRAS alterations occur in 15-20% of all human cancers and are most commonly seen in lung, bowel and pancreatic cancers (1, 2). Of the KRAS alterations, the G12C alteration is present in about 2% of all human cancers (3). In the most commonly occurring form of lung cancer, 11% of patients have this G12C alteration (3). In bowel and pancreatic cancer, about 1-3% of patients have this G12C alteration (2, 3).

#Treating G12C KRas
Despite a significant number of lung and bowel cancer patients affected by the G12C alteration, developing effective treatments has proven challenging. It has been difficult to find an area on the surface of the KRas messenger where a drug might get a foothold to disrupt the unchecked multiplication of cells. Recently however, a couple of treatments have been developed that keep the G12C KRas messenger switched off, without affecting normal KRas. These treatments, including AMG 510, show great potential for the treatment of cancers caused by KRas G12C alterations (4).

#References:
1.	Ian A. Prior, Fiona E. Hood and James L. Hartley. 2020. The frequency of Ras mutations in cancer. Cancer Res. 80(14): 2969-2974
2.	Andrew M. Waters and Channing J. Der. 2018. KRAS: The Critical Driver and Therapeutic Target for Pancreatic Cancer. Cold Spring Harb Perspect Med. 8(9): a031435
3.	AACR Project GENIE: Powering Precision Medicine through an International Consortium. 2017. Cancer Discov. 7(8): 818-831
4.	Jude Cannon, Karen Rex, Anne Y. Saiki et al. 2019. The clinical KRAS (G12C) inhibitor AMG 510 drives anti-tumour immunity. Nature. 575: 217-223
`;
const emailText = `##Terms and Definitions:
#AMG 510:
An experimental anti-cancer drug. It targets the G12C alteration in the KRas messenger, which is responsible for various forms of cancer

#Cancer:
A disease where abnormal cells multiply without control and spread to other nearby body tissue and/or organs. Cancer cells can also spread to other parts of the body through the bloodstream and lymph systems

#Cells:
* the smallest, living parts of the body. Cells work together to form or build the body
* a human is made up of millions of cells
* cells multiply and reproduce themselves to make sure a body stays working
* sometimes cells can be abnormal or damaged and these can be cancer cells

#KRas:
A special messenger inside our cells that tells a cell when to multiply 

#KRas, G12C:
A defective alteration in KRas that tells a cell to multiply constantly

#Pancreas/pancreatic cancer:
A long flattened gland located deep in the belly. A vital part of the digestive system and critical controller of blood sugar levels. Pancreatic cancer occurs when malignant cells develop in part of the pancreas

#Useful Links:
Genetics Home Reference. Your Guide to Understanding Genetic Conditions [https://ghr.nlm.nih.gov/gene/KRAS](https://ghr.nlm.nih.gov/gene/KRAS)
Pathology Dictionary: KRAS [https://www.mypathologyreport.ca/kras/](https://www.mypathologyreport.ca/kras/)
`

function drawBannerPage(text: string) : d3.Selection<HTMLDivElement, unknown, HTMLElement, any>{
  var row = d3.select("#contentBox").append("div").classed("row", true)
  var result = row.append("div")
    .classed("col-xs-9", true)
    .attr("id", "bannerPageInner")
    .html(md.makeHtml(text))
  row.append("div")
    .classed("col-xs-3", true)
    .classed("sideBanner", true)

  return result;
}

function welcome () {
  hideEverything()
  d3.select('a[href="#Welcome"]').classed('selected', true)
  $('#contentBox').html()

  drawBannerPage(welcomeText)
}

let currentScreen = null
welcome()

function hideEverything () {
  d3.selectAll("ul li a").classed('selected', false)
  $('#contentBox').html('')
  d3.selectAll('.bigText').classed('hidden', true)
  d3.selectAll('.drawer').classed('hidden', true)
  d3.select('#noteBox').classed('hidden', true)
  d3.select('#emailForm').classed('hidden', true)
  d3.select('#imageTitle').classed('hidden', true)

  if (currentScreen) {
    console.log('saving data for ' + currentScreen)
    console.log(drawingData.lines)
    images[currentScreen].lines = drawingData.lines.map(d => {
      return {
        points: d.points,
        color: d.color
      }
    })

    $('#lineData').val(JSON.stringify(images))
  } else {
    console.log('Not on a screen to save..?')
  }
}

var drawers = []

function openScreen (id) {
  hideEverything()
  d3.select(`a[onclick="openScreen(${id})"]`).classed('selected', true)
  d3.select('#noteBox').classed('hidden', false)

  let drawingData :DrawingData = images[id]
  const blob = drawingData
  const image = blob.image
  currentScreen = id

  d3.select('#imageTitle').classed('hidden', false).text(blob.name)

  let drawer = drawers[id] || new Drawer(drawingData)
  drawers[id] = drawer

  drawer.paint(drawingData)

  d3.select('.drawer').classed('hidden', false)
  d3.select('#d3-background-image').attr('href', `/images/${image}`)

  const div = d3.select('#contentBox').append('div')
  div.append('img').attrs({
    class: 'bigImage',
    src: `/images/${image}`
  })
  const div2 = d3.select('#contentBox').append('div')
  d3.select(`#text-${id}`).classed('hidden', false)
}

function introduction () {
  hideEverything()
  d3.select('a[href="#Introduction"]').classed('selected', true)

  drawBannerPage(introductionText)

}

// If you want the iframe to be responsive:
// https://www.w3schools.com/howto/howto_css_responsive_iframes.asp
function video () {
  hideEverything()
  d3.select('a[href="#Video"]').classed('selected', true)
  drawBannerPage("")

  $('#bannerPageInner')
    .html(md.makeHtml(`##The Role of KRas in Cancer`))
    .append('<br>')
    .append('<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pD5q4TlZW-M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
    .append('<br>')
    .append(md.makeHtml(`#Link to Protein Databank:
[Mutant KRas interacting with AMG 510](https://www.rcsb.org/pdb/explore/jmol.do?structureId=6oim&bionumber=1&jmolMode=HTML5)
`))

}

function email () {
  hideEverything()
  d3.select('a[href="#Email"]').classed('selected', true)
  d3.select('#emailForm').classed('hidden', false)

  $("#emailExtraInfo")
  .html(md.makeHtml(emailText))
}

function toggleImageLinks () {
  $('li.image').toggleClass("hidden")
}

function printVersion() {
  $("#wrapper").toggleClass("pdfMode");

  $("#contentBox")
  .append('<div style="page-break-after:always">&nbsp;</div>')
  .append(md.makeHtml(introductionText))
  .append('<div style="page-break-after:always">&nbsp;</div>')

  // d3.selectAll('.bigText').classed('hidden', false)
  // d3.selectAll('.drawer').classed('hidden', false)
  // d3.select('#noteBox').classed('hidden', false)
  // d3.select('#emailForm').classed('hidden', false)
  // d3.select('#imageTitle').classed('hidden', false)

  // alert("Print version called!");
  // openScreen(1)
}

