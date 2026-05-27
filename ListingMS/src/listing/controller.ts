import {Body, Controller, Get, Patch, Path, Post, Query, Response, Route, SuccessResponse} from 'tsoa'
import {Ceremony, Listing, NewListing, UUID} from '.'
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
  public async getListingById(@Path() id: UUID): Promise<Listing|undefined> {
    const listing = await new ListingService().getListingsById(id)
    if (!listing) {
      this.setStatus(404)
      return undefined
    }
    return listing
  }

  @Get('member/{member}')
  public async getAllListingsByMember(@Path() member: UUID): Promise<Listing[]> {
    return new ListingService().getAllListingsByMember(member)
  }

  @SuccessResponse(201, 'Created')
  @Post()
  public async createListing(@Body() body: NewListing): Promise<Listing> {
    this.setStatus(201)
    return new ListingService().createListing(body)
  }

  @Response(404, 'Not found')
  @Patch('{id}/quantity')
  public async editQuantity(@Path() id: UUID, @Body() body: {quantity: number}): Promise<Listing|null> {
    const listing = await new ListingService().editQuantity(id, body.quantity)
    if (!listing) { this.setStatus(404) }
    return listing
  }

  @Response(404, 'Not found')
  @Patch('{id}/method')
  public async editMethod(@Path() id: UUID, @Body() body: {method: string[]}): Promise<Listing|null> {
    const listing = await new ListingService().editMethod(id, body.method)
    if (!listing) { this.setStatus(404) }
    return listing
  }

  @Response(404, 'Not found')
  @Patch('{id}/available')
  public async editAvailable(@Path() id: UUID, @Body() body: {available: boolean}): Promise<Listing|null> {
    const listing = await new ListingService().editAvailable(id, body.available)
    if (!listing) { this.setStatus(404) }
    return listing
  }
}