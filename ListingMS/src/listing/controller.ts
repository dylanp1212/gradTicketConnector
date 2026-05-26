import {Controller, Get, Path, Query, Response, Route} from 'tsoa'
import {Listing, UUID} from '.'
import {ListingService} from './service'
@Route('listing')
export class ListingController extends Controller {
  @Get()
  public async getAllListings(): Promise<Listing[]> {
    return new ListingService().getAllListings()
  }
}