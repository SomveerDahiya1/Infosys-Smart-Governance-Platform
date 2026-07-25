import "../../styles/common/Dashboard.css";

export default function DashboardCard({
                                          title,
                                          count,
                                          icon,
                                          color
                                      }) {
    return (
        <div
            className="stat-card"
            style={{
                borderLeft: `6px solid ${color}`
            }}
        >
            <div className="card-top">
                <div>
                    <p>{title}</p>
                    <h2>{count}</h2>
                </div>

                <div
                    className="card-icon"
                    style={{
                        background: color
                    }}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}