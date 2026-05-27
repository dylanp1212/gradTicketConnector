import {Controller, Get, Path, Query, Response, Route, SuccessResponse} from 'tsoa'
import {Ceremony, Listing, UUID} from '.'
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

  @Response(404, 'Not found')
  @SuccessResponse(200, 'OK')
  @Get('{id}')
  public async getListingById(@Path() id: UUID): Promise<Listing | undefined> {
    const listing = await new ListingService().getListingsById(id)
    if (!listing) {
      this.setStatus(404)
      return undefined
    }
    return listing
  }
}