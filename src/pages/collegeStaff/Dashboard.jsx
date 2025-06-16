import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement, 
    Title,
    Tooltip,
    Legend,
);

const CollegeDashboard = ({ recentPlacementData, collegeData, collegeChartData }) => {

    const applicationOverviewData = {
        labels: ['Total Students', 'Students Applied', 'Students Placed'],
        datasets: [
            {
                label: 'Student Count',
                data: [collegeData?.totalStudents, collegeData?.totalStudentsApplied, collegeData?.totalStudentsPlaced],
                backgroundColor: [
                    'rgba(75,192,192,0.6)', // Greenish color
                    'rgba(153,102,255,0.6)', // Purple color
                    'rgba(255,159,64,0.6)', // Orange color
                ],
            },
        ],
    };

    const applicationOverviewOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            title: {
                display: true,
                text: 'Application Overview',
            },
            legend: {
                position: 'top',
            },
        },
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Department-wise Placement Overview',
            },
        },
    };

    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="font-medium text-gray-700">Total Students</p>
                    <p className="text-2xl font-bold text-blue-600">{collegeData?.totalStudents || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="font-medium text-gray-700">Total Jobs</p>
                    <p className="text-2xl font-bold text-blue-600">{collegeData?.totalJobs || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="font-medium text-gray-700">Students Applied</p>
                    <p className="text-2xl font-bold text-purple-600">{collegeData?.totalStudentsApplied || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="font-medium text-gray-700">Students Placed</p>
                    <p className="text-2xl font-bold text-green-600">{collegeData?.totalStudentsPlaced || 0}</p>
                </div>
            </div>

            {/* Application Overview and Department Placement Chart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Application Overview
                    </h3>
                    {collegeData && <div style={{ position: 'relative', height: '300px' }}>
                        <Doughnut
                            data={applicationOverviewData}
                            options={applicationOverviewOptions}
                        />
                    </div>}
                </div>

                {/* Department-wise Placement Charts (Right-aligned) */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Department-wise Placement Overview
                    </h3>

                    {/* First Bar Chart - Placed vs Total Students */}
                    {collegeChartData?.departmentChartData && <div style={{ position: 'relative', height: '300px' }}>
                        <Bar data={collegeChartData?.departmentChartData} options={chartOptions} />
                    </div>}
                </div>
            </div>

            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Recent Placements
                </h3>
                <ul className="space-y-4">
                    {recentPlacementData && recentPlacementData?.map((item) => (
                        <li className="flex justify-between bg-gray-50 p-4 rounded-md shadow-sm">
                            <p className="text-lg font-medium text-gray-700"><b>Company: </b> {item?.companyName}</p>
                            <p className="text-lg font-medium text-gray-700">
                                {item?.jobTitle}
                            </p>
                            <p className="text-lg font-medium text-gray-700"><b>Student:</b> {item?.studentName}</p>
                        </li>
                    ))}

                </ul>
            </section>
        </>
    );
};

export default CollegeDashboard;