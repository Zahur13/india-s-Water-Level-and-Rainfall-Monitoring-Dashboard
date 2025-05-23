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
  AreaChart,
  Area,
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
  CloudRain,
  Sun,
  CloudSnow,
  Wind,
} from "lucide-react";

const WaterRainfallMonitor = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [data, setData] = useState({
    states: [],
    rainfall: [],
    waterLevels: [],
    alerts: [],
    weather: {},
    predictions: [],
    cities: [],
  });
  const [loading, setLoading] = useState(true);

  // Weather forecast API integration for Indian cities
  const fetchWeatherForecast = async () => {
    const indianCities = [
      { name: "Mumbai", lat: 19.076, lon: 72.8777, state: "Maharashtra" },
      { name: "Delhi", lat: 28.7041, lon: 77.1025, state: "Delhi" },
      { name: "Bangalore", lat: 12.9716, lon: 77.5946, state: "Karnataka" },
      { name: "Chennai", lat: 13.0827, lon: 80.2707, state: "Tamil Nadu" },
      { name: "Kolkata", lat: 22.5726, lon: 88.3639, state: "West Bengal" },
      { name: "Hyderabad", lat: 17.385, lon: 78.4867, state: "Telangana" },
      { name: "Pune", lat: 18.5204, lon: 73.8567, state: "Maharashtra" },
      { name: "Ahmedabad", lat: 23.0225, lon: 72.5714, state: "Gujarat" },
      { name: "Jaipur", lat: 26.9124, lon: 75.7873, state: "Rajasthan" },
      { name: "Lucknow", lat: 26.8467, lon: 80.9462, state: "Uttar Pradesh" },
      { name: "Kochi", lat: 9.9312, lon: 76.2673, state: "Kerala" },
      { name: "Bhopal", lat: 23.2599, lon: 77.4126, state: "Madhya Pradesh" },
    ];

    try {
      const forecasts = await Promise.all(
        indianCities.map(async (city) => {
          try {
            // Using OpenWeatherMap API - Replace YOUR_API_KEY with actual key
            // For demo purposes, we'll simulate realistic data based on Indian weather patterns
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=YOUR_API_KEY&units=metric`
            ).catch(() => null);

            // Simulate realistic Indian weather data if API fails
            const currentMonth = new Date().getMonth();
            const isMonsoon = currentMonth >= 5 && currentMonth <= 9; // June to October
            const isWinter = currentMonth >= 11 || currentMonth <= 1; // December to February

            const baseTemp = isWinter
              ? 15 + Math.random() * 15
              : isMonsoon
              ? 25 + Math.random() * 10
              : 20 + Math.random() * 20;
            const baseRain = isMonsoon
              ? Math.random() * 50 + 10
              : Math.random() * 10;
            const baseHumidity = isMonsoon
              ? 70 + Math.random() * 25
              : 40 + Math.random() * 40;

            return {
              city: city.name,
              state: city.state,
              lat: city.lat,
              lon: city.lon,
              current: {
                temp: Math.round(baseTemp + (Math.random() - 0.5) * 5),
                humidity: Math.round(baseHumidity),
                windSpeed: Math.round(Math.random() * 15 + 5),
                pressure: Math.round(1000 + Math.random() * 50),
                description: isMonsoon
                  ? "Partly cloudy with chance of rain"
                  : isWinter
                  ? "Clear sky"
                  : "Sunny",
                icon: isMonsoon ? "cloud-rain" : isWinter ? "cloud" : "sun",
              },
              forecast: Array.from({ length: 7 }, (_, i) => {
                const dayTemp = baseTemp + (Math.random() - 0.5) * 8;
                const rainChance = isMonsoon
                  ? Math.random() * 80 + 20
                  : Math.random() * 30;
                const rainAmount =
                  rainChance > 60 ? Math.random() * 25 + 5 : Math.random() * 5;

                return {
                  date: new Date(
                    Date.now() + (i + 1) * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-IN", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  }),
                  day: new Date(
                    Date.now() + (i + 1) * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-IN", { weekday: "short" }),
                  maxTemp: Math.round(dayTemp + Math.random() * 5),
                  minTemp: Math.round(dayTemp - Math.random() * 8),
                  humidity: Math.round(
                    baseHumidity + (Math.random() - 0.5) * 20
                  ),
                  rainChance: Math.round(rainChance),
                  rainAmount: Math.round(rainAmount * 10) / 10,
                  windSpeed: Math.round(Math.random() * 20 + 5),
                  description:
                    rainChance > 60
                      ? "Rain expected"
                      : rainChance > 30
                      ? "Partly cloudy"
                      : "Clear",
                  icon:
                    rainChance > 60
                      ? "cloud-rain"
                      : rainChance > 30
                      ? "cloud"
                      : "sun",
                };
              }),
            };
          } catch (error) {
            console.log(`Error fetching data for ${city.name}:`, error);
            return null;
          }
        })
      );

      return forecasts.filter(Boolean);
    } catch (error) {
      console.error("Error fetching weather forecasts:", error);
      return [];
    }
  };
  useEffect(() => {
    const fetchData = async () => {
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

      // Fetch weather predictions
      const predictions = await fetchWeatherForecast();

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
        predictions: predictions,
        cities: predictions,
      });
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(async () => {
      // Update only non-prediction data more frequently
      const quickUpdate = async () => {
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

        setData((prevData) => ({
          ...prevData,
          states: mockStatesData,
          alerts: alerts,
          weather: {
            temperature: Math.round(Math.random() * 10 + 28),
            humidity: Math.round(Math.random() * 30 + 60),
            windSpeed: Math.round(Math.random() * 20 + 5),
            pressure: Math.round(Math.random() * 50 + 1000),
          },
        }));
      };
      quickUpdate();
    }, 5000); // Update every 5 seconds

    // Update predictions less frequently (every 30 minutes)
    const predictionInterval = setInterval(async () => {
      await fetchData();
    }, 30 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearInterval(predictionInterval);
    };
  }, []);

  const getStatusColor = (status) => {
    return status === "Alert"
      ? "text-red-600 bg-red-100"
      : "text-green-600 bg-green-100";
  };

  const getWeatherIcon = (iconType) => {
    switch (iconType) {
      case "sun":
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case "cloud":
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case "cloud-rain":
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case "cloud-snow":
        return <CloudSnow className="h-6 w-6 text-blue-300" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getRainPredictionColor = (rainChance) => {
    if (rainChance >= 70) return "text-red-600 bg-red-100";
    if (rainChance >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
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
              { id: "prediction", label: "Rain Forecast", icon: CloudRain },
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

        {/* Rain Prediction Tab */}
        {activeTab === "prediction" && (
          <div className="space-y-6">
            {/* City Selector */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <CloudRain className="h-6 w-6 text-blue-500" />
                <span>7-Day Rain Forecast for Indian Cities</span>
              </h2>

              {/* Cities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.cities.map((cityData, index) => (
                  <div
                    key={cityData.city}
                    className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-600" />
                          <span>{cityData.city}</span>
                        </h3>
                        <p className="text-sm text-gray-600">
                          {cityData.state}
                        </p>
                      </div>
                      <div className="text-right">
                        {getWeatherIcon(cityData.current.icon)}
                        <div className="text-2xl font-bold text-gray-900">
                          {cityData.current.temp}°C
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-white rounded-lg">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Humidity:</span>
                          <span className="font-medium">
                            {cityData.current.humidity}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Wind:</span>
                          <span className="font-medium">
                            {cityData.current.windSpeed} km/h
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        {cityData.current.description}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        7-Day Forecast:
                      </h4>
                      {cityData.forecast.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className="flex items-center justify-between p-2 bg-white rounded text-sm"
                        >
                          <div className="flex items-center space-x-2">
                            {getWeatherIcon(day.icon)}
                            <span className="font-medium w-12">{day.day}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-600">
                              {day.minTemp}°-{day.maxTemp}°C
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${getRainPredictionColor(
                                day.rainChance
                              )}`}
                            >
                              {day.rainChance}%
                            </span>
                            {day.rainAmount > 0 && (
                              <span className="text-blue-600 font-medium">
                                {day.rainAmount}mm
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rainfall Prediction Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Next 7 Days Rain Prediction Comparison
              </h3>
              <div className="mb-4">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[...new Set(data.cities.map((city) => city.state))].map(
                    (state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    )
                  )}
                </select>
              </div>

              {selectedState && (
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart
                    data={data.cities
                      .filter((city) => city.state === selectedState)
                      .flatMap((city) =>
                        city.forecast.map((day) => ({
                          ...day,
                          city: city.city,
                        }))
                      )}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "rainAmount" ? `${value} mm` : `${value}%`,
                        name === "rainAmount"
                          ? "Expected Rainfall"
                          : "Rain Probability",
                      ]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="rainChance"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                      name="Rain Chance %"
                    />
                    <Area
                      type="monotone"
                      dataKey="rainAmount"
                      stackId="2"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.8}
                      name="Expected Rainfall (mm)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Weekly Rain Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Weekly Rainfall Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {data.cities
                      .reduce(
                        (sum, city) =>
                          sum +
                          city.forecast.reduce(
                            (citySum, day) => citySum + day.rainAmount,
                            0
                          ),
                        0
                      )
                      .toFixed(1)}
                  </div>
                  <div className="text-sm text-blue-700">
                    Total Expected (mm)
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(
                      data.cities.reduce(
                        (sum, city) =>
                          sum +
                          city.forecast.reduce(
                            (citySum, day) => citySum + day.rainChance,
                            0
                          ) /
                            city.forecast.length,
                        0
                      ) / data.cities.length
                    )}
                    %
                  </div>
                  <div className="text-sm text-green-700">
                    Avg Rain Probability
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {
                      data.cities.filter((city) =>
                        city.forecast.some((day) => day.rainChance >= 70)
                      ).length
                    }
                  </div>
                  <div className="text-sm text-yellow-700">
                    High Rain Risk Cities
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      data.cities.reduce(
                        (sum, city) => sum + city.current.temp,
                        0
                      ) / data.cities.length
                    )}
                    °C
                  </div>
                  <div className="text-sm text-purple-700">Avg Temperature</div>
                </div>
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
