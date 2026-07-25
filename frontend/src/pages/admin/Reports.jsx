import {
    FaFilePdf,
    FaFileExcel,
    FaDownload,
    FaCalendarAlt,
    FaHistory
} from "react-icons/fa";

import "../../styles/admin/Reports.css";

export default function Reports() {

    const reports = [

        {
            name:"Monthly Complaint Report",
            type:"PDF",
            date:"July 2026",
            status:"Ready"
        },

        {
            name:"Officer Performance Report",
            type:"Excel",
            date:"July 2026",
            status:"Ready"
        },

        {
            name:"Citizen Feedback Report",
            type:"PDF",
            date:"June 2026",
            status:"Ready"
        },

        {
            name:"Complaint Analytics",
            type:"Excel",
            date:"June 2026",
            status:"Ready"
        }

    ];

    return(

        <div className="reports-page">

            {/* Header */}

            <div className="reports-header">

                <div>

                    <h1>

                        Reports

                    </h1>

                    <p>

                        Generate and download system reports.

                    </p>

                </div>

            </div>

            {/* Generate Cards */}

            <div className="report-actions">

                <div className="report-card">

                    <FaFilePdf className="pdf"/>

                    <h3>

                        PDF Report

                    </h3>

                    <p>

                        Export complete complaint report.

                    </p>

                    <button>

                        Generate PDF

                    </button>

                </div>

                <div className="report-card">

                    <FaFileExcel className="excel"/>

                    <h3>

                        Excel Report

                    </h3>

                    <p>

                        Download spreadsheet data.

                    </p>

                    <button>

                        Generate Excel

                    </button>

                </div>

            </div>

            {/* Report History */}

            <div className="history-card">

                <div className="section-header">

                    <h2>

                        <FaHistory/>

                        Report History

                    </h2>

                </div>

                <table>

                    <thead>

                    <tr>

                        <th>Name</th>

                        <th>Format</th>

                        <th>Date</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        reports.map((report,index)=>(

                            <tr key={index}>

                                <td>

                                    {report.name}

                                </td>

                                <td>

                                    {report.type}

                                </td>

                                <td>

                                    <FaCalendarAlt/>

                                    {" "}

                                    {report.date}

                                </td>

                                <td>

                                    <span className="ready">

                                        {report.status}

                                    </span>

                                </td>

                                <td>

                                    <button className="download-btn">

                                        <FaDownload/>

                                        Download

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                    </tbody>

                </table>

            </div>

        </div>

    );

}