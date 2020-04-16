import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import './Upload.css'; 

class Upload extends Component {

    onDrop(files) {

        this.setState({ files });

        var file = files[0];

        const reader = new FileReader();

        reader.onload = () => {

            csv.parse(reader.result, (err, data) => {

                var dataList = [];

                for (var i = 0; i < data.length; i++) {
                    
                    const newData = {
                        "Age at Diagnosis": data[i][0],
                        "Type of Breast Surgery": data[i][1],
                        "Cancer Type Detailed": data[i][2],
                        "Cellularity": data[i][3],
                        "Chemotherapy": data[i][4],
                        "Pam50 + Claudin - low subtype": data[i][5],
                        "Cohort": data[i][6],
                        "ER status measured by IHC": data[i][7],
                        "ER Status": data[i][8],
                        "Neoplasm Histologic Grade": data[i][9],
                        "HER2 status measured by SNP6": data[i][10],
                        "HER2 Status": data[i][11],
                        "Tumor Other Histologic Subtype": data[i][12],
                        "Hormone Therapy": data[i][13],
                        "Inferred Menopausal State": data[i][14],
                        "Integrative Cluster": data[i][15],
                        "Primary Tumor Laterality": data[i][16],
                        "Lymph nodes examined positive": data[i][17],
                        "Mutation Count": data[i][18],
                        "Nottingham prognostic index": data[i][19],
                        "Oncotree Code": data[i][20],
                        "PR Status": data[i][21],
                        "Radio Therapy": data[i][22],
                        "3 - Gene classifier subtype": data[i][23],
                        "Tumor Size": data[i][24],
                        "Tumor Stage": data[i][25]
                        };

                    dataList.push(newData);

                };

                this.props.updateData(dataList);
            });
        };

        reader.readAsBinaryString(file);
    }

    render() {

        return (
            <div align="center" oncontextmenu="return false">
                <br /><br /><br />
                <div className="dropzone">
                    <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}>
                    </Dropzone>
                    <br /><br /><br />
                </div>
                <h2 className="Upload-Text">Upload or drop your <font className="Upload-Text-Font">CSV</font><br /> file here.</h2>
                <h3> 
                    Should follow the format of: 
                </h3>
                <h3 className="Upload-Input-Text">
                    Age at Diagnosis, Type of Breast Surgery, Cancer Type Detailed, Cellularity, Chemotherapy, Pam50 + Claudin - low subtype, Cohort, ER status measured by IHC, ER Status, Neoplasm Histologic Grade, HER2 status measured by SNP6, HER2 Status, Tumor Other Histologic Subtype, Hormone Therapy, Inferred Menopausal State, Integrative Cluster, Primary Tumor Laterality, Lymph nodes examined positive, Mutation Count, Nottingham prognostic index, Oncotree Code, PR Status, Radio Therapy, 3 - Gene classifier subtype, Tumor Size, Tumor Stage.
                </h3>
            </div>
        )
    }
}

export default Upload;