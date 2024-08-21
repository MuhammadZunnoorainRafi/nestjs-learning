import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginatedType } from '../types/pagination.type';

@Injectable()
export class PaginationService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<PaginatedType<T>> {
    const result = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';

    const newUrl = new URL(this.request.url, baseUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const prevPage = paginationQuery.page <= 1 ? 1 : paginationQuery.page - 1;

    const finalResponse: PaginatedType<T> = {
      data: result,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalPages: totalPages,
        currentPage: paginationQuery.page,
        totalItems: totalItems,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?page=${paginationQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?page=${prevPage}`,
      },
    };

    return finalResponse;
  }
}

// 👇 console.log({ baseUrl, newUrl, url: this.request.url });
// {
//   baseUrl: 'http://localhost:3000/',
//   newUrl: URL {
//     href: 'http://localhost:3000/posts?page=1',
//     origin: 'http://localhost:3000',
//     protocol: 'http:',
//     username: '',
//     password: '',
//     host: 'localhost:3000',
//     hostname: 'localhost',
//     port: '3000',
//     pathname: '/posts',
//     search: '?page=1',
//     searchParams: URLSearchParams { 'page' => '1' },
//     hash: ''
//   },
//   url: '/posts?page=1'
// }
