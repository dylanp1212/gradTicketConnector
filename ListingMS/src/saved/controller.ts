import {Controller, Delete, Get, Path, Post, Route} from 'tsoa'
import {Listing, UUID} from '../listing'
import {ListingService} from './service'

@Route('saved')
export class SavedController extends Controller {
  @Post('{id}/{listingid}')
  public async saveListing(@Path() id: UUID, @Path() listingid: UUID): Promise<string> {
    return new ListingService().saveListing(id, listingid)
  }

  @Get('{id}/{listingid}')
  public async checkSaved(@Path() id: UUID, @Path() listingid: UUID): Promise<boolean> {
    return new ListingService().checkSaved(id, listingid)
  }

  @Delete('{id}/{listingid}')
  public async removeSavedListing(@Path() id: UUID, @Path() listingid: UUID): Promise<string> {
    return new ListingService().removeSavedListing(id, listingid)
  }

  @Get('{id}')
  public async getAllSavedListings(@Path() id: UUID): Promise<Listing[]> {
    return new ListingService().getAllSavedListings(id)
  }
}
