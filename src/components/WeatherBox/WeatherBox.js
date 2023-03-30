import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = (props) => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCityChange = useCallback((city) => {
    setPending(true);
    console.log(city);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ddedd4ebc6f1c8eaa18b8a00a62d417&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        };
        setPending(false);
        setWeather(weatherData);
        console.log(weatherData);
      });
  });

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !pending && <WeatherSummary {...weather} />}
      {pending && <Loader />}
    </section>
  );
};

export default WeatherBox;
