import TripSortsView from '../view/trip-sorts-view.js';
import TripListView from '../view/trip-list-view.js';
import TripItemView from '../view/trip-item.js';
import NewPoint from '../view/new-point-view.js';
import BoardView from '../view/board-view.js';
import { render, RenderPosition } from '../render.js';

const COUNT_ITEMS = 3;

export default class BoardPresenter {
  boardComponent = new BoardView();
  tripListComponent = new TripListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new TripSortsView(), this.boardComponent.getElement());
    render(this.tripListComponent, this.boardComponent.getElement());
    render(new NewPoint(), this.tripListComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < COUNT_ITEMS; i++) {
      render(new TripItemView(), this.tripListComponent.getElement());
    }
  }
}
