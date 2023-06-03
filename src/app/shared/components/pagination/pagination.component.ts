import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() total = 0;
  @Input() limit = 0;
  @Input() currentPage = 1;
  @Input() url = '';

  pagesCount = 1;
  pages: number[] = [];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : [];
  }
}
