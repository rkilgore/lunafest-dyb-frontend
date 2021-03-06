import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from '@angular/material';

import { Item } from "../models";
import { EditItemService } from './edit-item.service';
import { NewItemFormOutput } from '../new-item-form/new-item-form-output.model';
import { SerializationHelper } from '../util';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'dyb-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  public existingItem: Item;

  public savingItem = false;

  public itemSaveComplete: boolean;

  private itemId: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private editItemService: EditItemService, private dialog: MatDialog) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        if (params.get("id") !== undefined) {
          this.itemId = params.get("id");
          this.getItem(params.get("id"));
        }
      }
    );
  }


  public save(formData: NewItemFormOutput) {
    const images = this.flattenImages(formData.images);
    formData.images = images;
    const editItem = SerializationHelper.toInstance(new Item(), formData);
    this.savingItem = true;
    this.editItemService.updateItem(this.itemId, editItem).then(
      (data) => {
        this.itemSaveComplete = true;
        setTimeout(() => {
          this.router.navigate(["/user/items/list"]);
        }, 1500);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public cancel(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Cancel Edit",
        content: "Are you sure you want to cancel editing this item? Any data you've entered will be lost.",
        acceptText: "Leave",
        cancelText: "Continue Editing"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(["/user/items/list"]);
      }
    });
  }

  public deleteItem(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Delete ${this.existingItem.name}`,
        content: "Are you sure you want to delete this item? You won't be able to undo this action.",
        acceptText: "Delete Item",
        cancelText: "Cancel"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editItemService.deleteItem(this.existingItem.key).then(
          (_) => {
            this.router.navigate(["/user/items/list"]);
          }
        );
      }
    })
    
  }

  private getItem(itemId: string): void {
    this.editItemService.getItem(itemId).subscribe((data) => {
      this.existingItem = data;
    });
  }

  private flattenImages(images: ({name: string, originalValue: string}|File)[]): string[] {
    const flatterImages = [];
    images.map((elem) => {
      if (elem instanceof File) {
        flatterImages.push(elem);
      }
      else {
        flatterImages.push(elem.originalValue);
      }
    });
    return flatterImages;
  }

}
