import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Droplets,
  Cloud,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Thermometer,
  Eye,
} from "lucide-react";

const WaterRainfallMonitor = () => {
  const [activeTab, setActiveTab] = useState("overview");
  // const [selectedState, setSelectedState] = useState("Maharashtra");
  const [data, setData] = useState({
    states: [],
    rainfall: [],
    waterLevels: [],
    alerts: [],
    weather: {},
  });
  const [loading, setLoading] = useState(true);

  // Simulated live data - In real implementation, this would fetch from APIs like:
  // - India Meteorological Department (IMD)
  // - Central Water Commission (CWC)
  // - OpenWeatherMap API
  // - Satellite imagery APIs
  useEffect(() => {
    const fetchData = () => {
      // Simulated data that changes every few seconds to mimic live updates
      const mockStatesData = [
        {
          name: "Maharashtra",
          rainfall: Math.random() * 50 + 20,
          waterLevel: Math.random() * 30 + 40,
          temperature: Math.random() * 10 + 25,
          humidity: Math.random() * 30 + 60,
          status: Math.random() > 0.7 ? "Alert" : "Normal",
          lastUpdated: new Date().toLocaleTimeString(),
        },
        {
          name: "Kerala",
          rainfall: Math.random() * 80 + 30,
          waterLevel: Math.random() * 25 + 50,
          temperature: Math.random() * 8 + 28,
          humidity: Math.random() * 25 + 70,
          status: Math.random() > 0.6 ? "Alert" : "Normal",
          lastUpdated: new Date().toLocaleTimeString(),
        },
        {
          name: "Rajasthan",
          rainfall: Math.random() * 20 + 5,
          waterLevel: Math.random() * 40 + 20,
          temperature: Math.random() * 12 + 30,
          humidity: Math.random() * 20 + 40,
          status: Math.random() > 0.8 ? "Alert" : "Normal",
          lastUpdated: new Date().toLocaleTimeString(),
        },
        {
          name: "West Bengal",
          rainfall: Math.random() * 60 + 25,
          waterLevel: Math.random() * 35 + 35,
          temperature: Math.random() * 9 + 26,
          humidity: Math.random() * 28 + 65,
          status: Math.random() > 0.7 ? "Alert" : "Normal",
          lastUpdated: new Date().toLocaleTimeString(),
        },
        {
          name: "Tamil Nadu",
          rainfall: Math.random() * 45 + 15,
          waterLevel: Math.random() * 30 + 30,
          temperature: Math.random() * 10 + 27,
          humidity: Math.random() * 25 + 60,
          status: Math.random() > 0.75 ? "Alert" : "Normal",
          lastUpdated: new Date().toLocaleTimeString(),
        },
        {
          name: "Uttar Pradesh",
          rainfall: Math.random() * 35 + 10,
          waterLevel: Math.random() * 45 + 25,
          temperature: Math.random() * 11 + 24,
          humidity: Math.random() * 30 + 55,
          status: Math.random() > 0.8 ? "Alert" : "Normal",
          lastUpdated: new Date().toLocaleTimeString(),
        },
      ];

      const mockRainfallTrend = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        rainfall: Math.random() * 15 + 2,
        intensity: Math.random() * 10 + 1,
      }));

      const mockWaterLevels = Array.from({ length: 7 }, (_, i) => ({
        day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
        level: Math.random() * 20 + 30,
        capacity: Math.random() * 15 + 60,
      }));

      const alerts = mockStatesData
        .filter((state) => state.status === "Alert")
        .map((state) => ({
          id: Math.random(),
          state: state.name,
          type:
            state.rainfall > 60
              ? "Heavy Rainfall"
              : state.waterLevel < 30
              ? "Low Water Level"
              : "Weather Alert",
          severity: Math.random() > 0.5 ? "High" : "Medium",
          time: state.lastUpdated,
        }));

      setData({
        states: mockStatesData,
        rainfall: mockRainfallTrend,
        waterLevels: mockWaterLevels,
        alerts: alerts,
        weather: {
          temperature: Math.round(Math.random() * 10 + 28),
          humidity: Math.round(Math.random() * 30 + 60),
          windSpeed: Math.round(Math.random() * 20 + 5),
          pressure: Math.round(Math.random() * 50 + 1000),
        },
      });
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    return status === "Alert"
      ? "text-red-600 bg-red-100"
      : "text-green-600 bg-green-100";
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading live data...</p>
        </div>
      </div>
    );
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Droplets className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  India Water & Rainfall Monitor
                </h1>
                <p className="text-sm text-gray-600">
                  Real-time monitoring system
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Live</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Last Updated</div>
                <div className="text-sm font-semibold">
                  {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Eye },
              { id: "rainfall", label: "Rainfall Data", icon: Cloud },
              { id: "water", label: "Water Levels", icon: Droplets },
              { id: "alerts", label: "Alerts", icon: AlertTriangle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Weather Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Temperature
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {data.weather.temperature}°C
                    </p>
                  </div>
                  <Thermometer className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Humidity
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {data.weather.humidity}%
                    </p>
                  </div>
                  <Droplets className="h-12 w-12 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Wind Speed
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {data.weather.windSpeed} km/h
                    </p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-purple-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pressure
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {data.weather.pressure} hPa
                    </p>
                  </div>
                  <Calendar className="h-12 w-12 text-orange-500" />
                </div>
              </div>
            </div>

            {/* State Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                State-wise Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.states.map((state, index) => (
                  <div
                    key={state.name}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <h3 className="font-semibold text-gray-900">
                          {state.name}
                        </h3>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          state.status
                        )}`}
                      >
                        {state.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rainfall:</span>
                        <span className="font-medium">
                          {state.rainfall.toFixed(1)} mm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Water Level:</span>
                        <span className="font-medium">
                          {state.waterLevel.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temperature:</span>
                        <span className="font-medium">
                          {state.temperature.toFixed(1)}°C
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Updated: {state.lastUpdated}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Rainfall Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.states}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="rainfall"
                      label={({ name, value }) =>
                        `${name}: ${value.toFixed(1)}mm`
                      }
                    >
                      {data.states.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Water Level Status
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.states}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="waterLevel"
                      fill="#3B82F6"
                      name="Water Level %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Rainfall Tab */}
        {activeTab === "rainfall" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                24-Hour Rainfall Trend
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.rainfall}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rainfall"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Rainfall (mm)"
                  />
                  <Line
                    type="monotone"
                    dataKey="intensity"
                    stroke="#EF4444"
                    strokeWidth={2}
                    name="Intensity"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                State-wise Rainfall Comparison
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.states} margin={{ bottom: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rainfall" fill="#10B981" name="Rainfall (mm)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Water Levels Tab */}
        {activeTab === "water" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Weekly Water Level Trend
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.waterLevels}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="level"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    name="Current Level %"
                  />
                  <Line
                    type="monotone"
                    dataKey="capacity"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Capacity %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Current Water Levels by State
              </h3>
              <div className="space-y-4">
                {data.states.map((state, index) => (
                  <div key={state.name} className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-medium text-gray-700">
                      {state.name}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${
                          state.waterLevel < 30
                            ? "bg-red-500"
                            : state.waterLevel < 60
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(state.waterLevel, 100)}%` }}
                      ></div>
                    </div>
                    <div className="w-16 text-sm font-medium text-gray-900 text-right">
                      {state.waterLevel.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <span>Active Alerts ({data.alerts.length})</span>
              </h2>

              {data.alerts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-green-500 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    No Active Alerts
                  </h3>
                  <p className="text-gray-500">
                    All monitored areas are within normal parameters
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="border border-red-200 rounded-lg p-4 bg-red-50"
                    >
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {alert.type}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSeverityColor(
                                alert.severity
                              )}`}
                            >
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-2">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            {alert.state}
                          </p>
                          <p className="text-sm text-gray-600">
                            Reported at: {alert.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Alert Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {data.alerts.filter((a) => a.severity === "High").length}
                  </div>
                  <div className="text-sm text-red-700">High Priority</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {data.alerts.filter((a) => a.severity === "Medium").length}
                  </div>
                  <div className="text-sm text-yellow-700">Medium Priority</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {data.alerts.filter((a) => a.severity === "Low").length}
                  </div>
                  <div className="text-sm text-blue-700">Low Priority</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WaterRainfallMonitor;
