import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawgService } from '../services/rawg.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  gameId: string = '';
  gameDetails: any;

  constructor(private route: ActivatedRoute, private rawgService: RawgService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameId = id;
      this.rawgService.getGameDetails(this.gameId).subscribe(data => {
        this.gameDetails = data;
      });
    } else {
      console.error('No game ID found in the route parameters');
    }
  }
}

