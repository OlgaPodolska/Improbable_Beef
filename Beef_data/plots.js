function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
init();

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
   
        Object.entries(result).forEach(([key, value]) => {
          PANEL.append("h6").text(`${key.toUpperCase()} : ${value}`);
          console.log(PANEL)
      });
    });
}

function buildCharts(sample) {
    //   // First get data
       d3.json("samples.json").then((data) => {
    
         var sampleInfo = data.samples;
         console.log("=====this is your  sampleInfo data ======")
         console.log(sampleInfo);
    
         //filtering  object by id
         var selectedSample = sampleInfo.filter(sampleObj => sampleObj.id == sample)[0];
         console.log(selectedSample,"woot woot");
    
        //  var sampleValue = selectedSample.map(value=>value.sample_values);
        var sampleValue = selectedSample.sample_values;
        console.log(sampleValue)
        // var arrayValue = sampleValue.slice(0, 10);
    
         var otus = selectedSample.otu_ids;
         console.log(selectedSample)
          
    
        var trace = {
          x: sampleValue,
          y: otus,
          type: "bar"
        };
    
        console.log(trace.x);
        console.log(trace.y)
        console.log("this working")
    
        //var data = [trace];
        var layout = {
        title: "Top 10",
        xaxis: { title: "OTUs" },
        yaxis: { title: "Values"}
        };
    
        // Plotly.newPlot("bar", trace, layout);
    
        Plotly.newPlot( "bar", [trace] );
    
    
      }); //END d3.json()  
    } //END buildCharts()
    
  
  

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }
