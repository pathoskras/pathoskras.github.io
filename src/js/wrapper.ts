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

KRas is a protein that forms part of a cell signalling pathway. This pathway instructs your cells to grow and divide or to mature and take on specialised functions. To stop these pathways functioning when not needed, KRas is bound to a regulating switch that keeps it turned off. In order for KRas to send signals, it needs to be turned on. To do this, the regulating switch is swapped for an ‘on-switch’. KRas is then active and can send signals for cells to grow, divide or mature. When no longer required, the KRas protein is turned off again by cleaving the on-switch, converting it back to the inactive state. When KRas is switched off, it cannot send signals.

#What Goes Wrong with KRas?
Changes in the genetic code for KRas have the potential to cause normal cells to become cancerous. One such change leads to a swap of the amino acid glycine for cystine at position 12 in the KRas protein. This change in KRas is known as a ‘G12C’ mutation. A G12C mutation is acquired during a person's lifetime; it is not inherited. This change results in a KRas protein that is constantly switched on. The result is that affected cells are directed to grow and divide out of control, leading to tumour formation.

#KRas and Cancer
KRAS mutations occur in 17-25% of all human cancers. Furthermore, the G12C mutation accounts for about 44% of all KRAS mutations. Indeed, in non-small cell lung carcinoma, which is the most commonly occurring form of lung cancer, 13% of patients have this G12C mutation. The G12C mutation also occurs in 1-3% of colorectal and pancreatic cancer patients.

#Treating Mutant G12C KRas
Despite a significant number of lung and colorectal cancer patients affected by the G12C mutation, developing effective treatments has proven challenging. It has been difficult to find an area on the surface of the KRas protein where a drug might get a foothold to disrupt the unchecked cell division. Recently, however, a couple of inhibitors have been developed that lock the G12C mutant KRas protein in the inactive state, without affecting the normal function of unmutated KRas. These inhibitors show great potential for the treatment of G12C mutant KRas cancers.
`;

function welcome () {
  hideEverything()
  d3.select('a[href="#Welcome"]').classed('selected', true)

  $('#contentBox').html(md.makeHtml(welcomeText))
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

function openScreen (id) {
  hideEverything()
  d3.select(`a[onclick="openScreen(${id})"]`).classed('selected', true)

  d3.select('#noteBox').classed('hidden', false)
  const blob = drawingData = images[id]
  const image = blob.image
  currentScreen = id

  d3.select('#imageTitle').classed('hidden', false).text(blob.name)

  paint(drawingData)

  d3.select('.drawer').classed('hidden', false)
  d3.select('#d3-background-image').attr('src', `/images/${image}`)

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

  $('#contentBox').html(md.makeHtml(introductionText))

}

function video () {
  hideEverything()
  d3.select('a[href="#Video"]').classed('selected', true)
  $('#contentBox')
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

