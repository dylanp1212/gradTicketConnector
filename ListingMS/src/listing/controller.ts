import {Controller, Get, Query, Route} from 'tsoa'
import {Ceremony, Listing} from '.'
import {ListingService} from './service'

@Route('listing')
export class ListingController extends Controller {
  @Get()
  public async getAllListings(
    @Query() ceremonies?: Ceremony[],
    @Query() term?: string,
    @Query() quantity?: number,
    @Query() method?: string[],
    @Query() available?: boolean,
    @Query() verified?: boolean,
  ): Promise<Listing[]> {
    // console.log(ceremonies)
    return new ListingService().getAllListings({ceremonies, term, quantity, method, available, verified})
  }
}