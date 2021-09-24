
// Initialize the app
let init = () => {
    d3Initialize()
}

let d3Initialize = () => {
    // Read in the json file and set the json to data
    d3.json("static/js/data/samples.json").then(data => {
        // Generate the drop down menu options
        dropDownGen(data.names)
        // load the default id for homepage
        chartBuildInit('940')
    })
};

let dropDownGen = (sampleNames) => {
    // Generate all the options for the dropdown menu
    sampleNames.map(value => {
        option = d3.select("#selDataset").append("option");
        option.attr("value", value).text(value)
    });
};

let optionChanged = (curOption) => {
    chartBuildInit(curOption)
}

let chartBuildInit = (curOption)  => {
    // Get current option selected
    d3.json("static/js/data/samples.json").then(data => {
        metadata = data.metadata.filter(testSubject => testSubject.id == curOption);
        samples = data.samples.filter(testSubject => testSubject.id == curOption);
        labelIds = samples[0].otu_ids;
        labels = samples[0].otu_labels;
        sampleValues = samples[0].sample_values;
        // Verifying filter and variables
        // console.log(samples);
        metadataPanel(metadata);
        graphOtu(sampleValues,labelIds,labels,curOption);
        graphTraceGaugeChart(metadata, curOption)
        // console.log(label_labels);
        // console.log(sample_values);
    })
    
};


let metadataPanel = (metadata) => {
    // reset the metaDataPanel
    d3.select('#sample-metadata').selectAll('h6').remove()
    // Select the id to for the data to occupy
    let metaDataPanel = d3.select('#sample-metadata');
    // Loop each item in metadata and populate the id
    Object.entries(metadata[0]).forEach(([key,value]) => {
        metaDataPanel.append('h6').text(`${key.toUpperCase()}: ${value}`);
    });
}

let graphOtu = (sampleValues,labelIds,labels,curOption) => {
    let topValues = sampleValues.slice(0,10).reverse()
    let topLablesId = labelIds.slice(0,10).reverse()
    graphTopOtu(topValues, topLablesId,curOption)
    graphBubbleChart(topValues, topLablesId,labels,curOption)
};

let graphTopOtu = (values, labelid, curOption) => {
    // setup the x and y intercepts to be graphed
    let traceTop = {
        x: values,
        y: labelid.map(id => `OTU ${id}`),
        type: 'bar',
        orientation: 'h',
        maker: {
            color: 'red'
        }};
    // Setting titles and layout parameters
    let layout = {
        title: {
            text: `<b> Top 10 OTU for ID ${curOption}</b>`,
            font: {
                size: 16
            },
            height: 1000,
            width: 800
        }};
    Plotly.newPlot('bar', [traceTop], layout);
    };
    // graphing the bubble chart
    let graphBubbleChart = (values, labelid, labels, curOption) => {
        // setup the x and y intercepts to be graphed
        let traceCir = {
            x: labelid,
            y: values,
            text: labels,
            mode:'markers',
            marker: {
                size: values,
                color:labelid,
            }};
        // Setting titles and layout parameters
        let layout = {
            title: {
                text: `<b> Bacteria Cultures for ID ${curOption}</b>`,
                font: {
                    size: 16
                },
                height: 1000,
                width: 800
            },
            xaxis: {
                title: {
                    text: `<b> OTU ID </b>`,
                    font: {
                        size: 16,
                    },
                    height: 1000,
                    width: 800
                }
            }
        };
        Plotly.newPlot('bubble', [traceCir], layout);
        };

        let graphTraceGaugeChart = (metadata, curOption) => {
            let traceGauge = [
                {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: metadata[0].wfreq,
                    title: { text: `<b> Belly Button Washing Frequency ID ${(curOption)}</b>` },
                    type: "indicator",
                    mode: "gauge+number",
                    gauge: {
                        axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
                        steps: [
                            { range: [0, 1], color: 'rgb(217, 216, 185)' },
                            { range: [1, 2], color: 'rgb(95, 161, 159)' },
                            { range: [2, 3], color: 'rgb(70, 150, 150)' },
                            { range: [3, 4], color: 'rgb(68, 140, 146)' },
                            { range: [4, 5], color: 'rgb(25, 114, 127)' },
                            { range: [5, 6], color: 'rgb(15, 90, 110)' },
                            { range: [6, 7], color: 'rgb(7, 95, 109)'},
                            { range: [7, 8], color: 'rgb(1, 81, 108)' },
                            { range: [8, 9], color: 'rgb(0, 53, 85)' }
                        ],
                        threshold: {
                            line: { color: "red", width: 4 },
                            thickness: 0.75,
                            value: 9
                        }
                    }
                }
            ];

            let layoutGauge = {
                width: 600,
                height: 500,
                margin: {
                    t:0, 
                    b:0
                },
            }
            Plotly.newPlot('gauge', traceGauge, layoutGauge)
        };

init()