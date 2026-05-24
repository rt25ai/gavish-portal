"use client";

import { BarChart, Bar, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, AreaChart, Area, RadialBarChart, RadialBar, PolarAngleAxis, Cell } from "recharts";

const navy = "#0F1E47";
const navy500 = "#1B2C5C";
const leaf = "#6FB94A";
const amber = "#F4B628";
const coral = "#E94B2A";
const teal = "#1B95B5";
const moss = "#5B9A3D";
const paper = "#FAF8F3";

const tooltipStyle = {
  background: navy,
  border: "none",
  borderRadius: 12,
  color: paper,
  fontFamily: "var(--font-body)",
  fontSize: 13,
  padding: "10px 14px",
};

export function YouthTrendChart() {
  const data = [
    { year: "2015", count: 870 },
    { year: "2018", count: 925 },
    { year: "2021", count: 985 },
    { year: "2024", count: 1040 },
    { year: "2026", count: 1075 },
    { year: "2030", count: 1170 },
  ];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="gradYouth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={leaf} stopOpacity={0.6} />
            <stop offset="100%" stopColor={leaf} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 6" stroke={navy} strokeOpacity={0.1} vertical={false} />
        <XAxis dataKey="year" tick={{ fontFamily: "var(--font-body)", fontSize: 12, fill: navy }} axisLine={false} tickLine={false} reversed />
        <YAxis tick={{ fontFamily: "var(--font-body)", fontSize: 12, fill: navy }} axisLine={false} tickLine={false} unit="K" />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}K`, "בני נוער"]} />
        <Area type="monotone" dataKey="count" stroke={leaf} strokeWidth={3} fill="url(#gradYouth)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DistrictBarChart() {
  const data = [
    { district: "מרכז", value: 268 },
    { district: "ירושלים", value: 232 },
    { district: "דרום", value: 198 },
    { district: "צפון", value: 195 },
    { district: "חיפה", value: 128 },
    { district: "תל אביב", value: 122 },
    { district: "יו״ש", value: 95 },
  ];
  const colors = [leaf, amber, coral, teal, moss, navy500, "#93cf6f"];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 0 }} barCategoryGap="22%">
        <CartesianGrid strokeDasharray="2 6" stroke={navy} strokeOpacity={0.1} vertical={false} />
        <XAxis dataKey="district" tick={{ fontFamily: "var(--font-body)", fontSize: 12, fill: navy }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontFamily: "var(--font-body)", fontSize: 12, fill: navy }} axisLine={false} tickLine={false} unit="K" />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}K`, "בני נוער"]} cursor={{ fill: navy, fillOpacity: 0.04 }} />
        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
          {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ParticipationRadial() {
  const data = [{ name: "השתתפות", value: 58, fill: leaf }];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background={{ fill: "rgba(15,30,71,0.08)" }} dataKey="value" cornerRadius={20} angleAxisId={0} />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-display" style={{ fontWeight: 900, fontSize: 56, fill: navy }}>
          58%
        </text>
        <text x="50%" y="68%" textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "var(--font-body)", fontSize: 13, fill: navy, opacity: 0.6 }}>
          השתתפות במסגרות
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export function InternationalCompare() {
  const data = [
    { country: "ישראל", value: 58 },
    { country: "פינלנד", value: 75 },
    { country: "גרמניה", value: 68 },
    { country: "צרפת", value: 52 },
    { country: "ארה״ב", value: 45 },
    { country: "ממוצע OECD", value: 60 },
  ];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, left: 70, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 6" stroke={navy} strokeOpacity={0.08} horizontal={false} />
        <XAxis type="number" tick={{ fontFamily: "var(--font-body)", fontSize: 12, fill: navy }} axisLine={false} tickLine={false} unit="%" />
        <YAxis dataKey="country" type="category" tick={{ fontFamily: "var(--font-display)", fontSize: 13, fill: navy, fontWeight: 600 }} axisLine={false} tickLine={false} width={70} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "השתתפות"]} cursor={{ fill: navy, fillOpacity: 0.04 }} />
        <Bar dataKey="value" radius={[0, 10, 10, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.country === "ישראל" ? leaf : navy500} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DigitalGapChart() {
  const data = [
    { year: "2020", center: 94, periphery: 76 },
    { year: "2021", center: 96, periphery: 79 },
    { year: "2022", center: 97, periphery: 82 },
    { year: "2023", center: 98, periphery: 84 },
    { year: "2024", center: 98, periphery: 86 },
    { year: "2025", center: 99, periphery: 88 },
  ];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 6" stroke={navy} strokeOpacity={0.1} vertical={false} />
        <XAxis dataKey="year" tick={{ fontFamily: "var(--font-body)", fontSize: 12, fill: navy }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontFamily: "var(--font-body)", fontSize: 12, fill: navy }} axisLine={false} tickLine={false} unit="%" domain={[60, 100]} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [`${v}%`, name === "center" ? "מרכז" : "פריפריה"]} />
        <Line type="monotone" dataKey="center" stroke={teal} strokeWidth={3} dot={{ r: 5, fill: teal, strokeWidth: 0 }} />
        <Line type="monotone" dataKey="periphery" stroke={coral} strokeWidth={3} strokeDasharray="6 6" dot={{ r: 5, fill: coral, strokeWidth: 0 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
