
// Initialize the app
d3.json("static/js/data/samples.json").then(data => {
    // Generate the drop down menu options
    dropDownGen(data.names);
    // create a listener for changes
})

let dropDownGen = (sampleNames) => {
    // Generate all the options for the dropdown menu
    sampleNames.map(value => {
        option = d3.select("#selDataset").append("option");
        option.attr("value", value).text(value)
    });
};

let optionChanged = (currOption) => {
    optionData(currOption)
}

let optionData = (currOption) => {
    // Get current option selected
    d3.json("static/js/data/samples.json").then(data => {
        metadata = data.metadata.filter(testSubject => testSubject.id == currOption);
        samples = data.samples.filter(testSubject => testSubject.id == currOption);
        label_ids = samples[0].otu_ids;
        label_labels = samples[0].otu_labels;
        sample_values = samples[0].sample_values;
        // Verifying filter and variables
        // console.log(samples);
        metadataPanel(metadata);
        topOtu(label_ids);
        // console.log(label_labels);
        // console.log(sample_values);
    });
};

let metadataPanel = (metadata) => {
    // Select the id to for the data to occupy
    let metaDataPanel = d3.select('#sample-metadata');
    // Loop each item in metadata and populate the id
    Object.entries(metadata[0]).forEach(([key,value]) => {
        metaDataPanel.append('h6').text(`${key.toUpperCase()}: ${value}`);
    });
};

let topOtu = (label_ids) => {
    console.log(label_ids)
};

init()