import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import * as RedisMock from 'ioredis-mock';

describe('LinkController', () => {
  let controller: LinkController;
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [
        LinkService,
        {
          provide: 'REDIS',
          useFactory: () => {
            return new RedisMock();
          },
        },
      ],
    }).compile();

    controller = module.get<LinkController>(LinkController);
    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a link', async () => {
    const value = 'test_value';
    const id = 'test_id';
    jest.spyOn(service, 'createLink').mockResolvedValue(id);

    const result = await controller.createLink(value);
    expect(result).toBe(id);
  });

  it('should get a link', async () => {
    const value = 'test_value';
    const id = 'test_id';
    jest.spyOn(service, 'getLink').mockResolvedValue(value);

    const result = await controller.getLink(id);
    expect(result).toBe(value);
  });

  it('should throw an error if link is not found', async () => {
    const id = 'test_id';
    jest
      .spyOn(service, 'getLink')
      .mockRejectedValue(new Error('Link not found or already used'));

    await expect(controller.getLink(id)).rejects.toThrow(
      'Link not found or already used',
    );
  });
});
