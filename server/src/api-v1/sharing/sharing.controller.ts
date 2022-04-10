import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { CreateSharedAlbumDto } from './dto/create-shared-album.dto';
import { JwtAuthGuard } from '../../modules/immich-jwt/guards/jwt-auth.guard';
import { GetAuthUser } from '../../decorators/auth-user.decorator';
import { AddAssetsDto } from './dto/add-assets.dto';

@UseGuards(JwtAuthGuard)
@Controller('shared')
export class SharingController {
  constructor(private readonly sharingService: SharingService) {}

  @Post('/createAlbum')
  async create(@GetAuthUser() authUser, @Body(ValidationPipe) createSharedAlbumDto: CreateSharedAlbumDto) {
    return await this.sharingService.create(authUser, createSharedAlbumDto);
  }

  @Post('/addUsers')
  async addUsers() {}

  @Post('/addAssets')
  async addAssets(@Body(ValidationPipe) addAssetsDto: AddAssetsDto) {
    return await this.sharingService.addAssetsToAlbum(addAssetsDto);
  }

  @Get('/allSharedAlbums')
  async getAllSharedAlbums(@GetAuthUser() authUser) {
    return await this.sharingService.getAllSharedAlbums(authUser);
  }

  @Get(':albumId')
  async getAlbumInfo(@GetAuthUser() authUser, @Param('albumId') albumId: string) {
    return await this.sharingService.getAlbumInfo(authUser, albumId);
  }
}