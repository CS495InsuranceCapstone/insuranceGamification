import { RandomEventLoader } from '../backend/event/eventloader'

describe('RandomEventLoader', () => {

  let eventLoader: RandomEventLoader;

  beforeEach(() => {
    eventLoader = new RandomEventLoader();
  });

  it('should be good', () => {
    expect(true).toBe(true);
  });

});
