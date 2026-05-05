import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ThreatChart = ({ threats }) => {
  // Count keywords
  const categories = {
    Phishing: 0,
    Malware: 0,
    Ransomware: 0,
    AI: 0,
    Other: 0,
  };

  threats.forEach((item) => {
    const text = item.toLowerCase();

    if (text.includes("phishing")) categories.Phishing++;
    else if (text.includes("malware")) categories.Malware++;
    else if (text.includes("ransomware")) categories.Ransomware++;
    else if (text.includes("ai")) categories.AI++;
    else categories.Other++;
  });

  const data = Object.keys(categories).map((key) => ({
    name: key,
    count: categories[key],
  }));

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" />
    </BarChart>
  );
};

export default ThreatChart;
