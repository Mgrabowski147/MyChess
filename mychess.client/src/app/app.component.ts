import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChessBoardComponent } from './components/chess-board/chess-board.component';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [ChessBoardComponent],
})
export class AppComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      },
    );
  }

  title = 'mychess.client';
}
