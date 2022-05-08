import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IconModule } from '../icon';
import { AvatarModule } from '../avatar';

import { ActionComponent } from './action.component';
import { ActionContentComponent } from './content.component';
import { ActionSimpleComponent } from './simple.component';
import { ActionMenuComponent } from './menu.component';
import { ActionMenuItemComponent } from './menu-item.component';
import { ActionButtonDirective } from './action-button.directive';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule,
    IconModule,
    AvatarModule,
  ],
  declarations: [
    ActionComponent,
    ActionContentComponent,
    ActionSimpleComponent,
    ActionMenuComponent,
    ActionMenuItemComponent,
    ActionButtonDirective,
  ],
  exports: [ActionComponent, ActionContentComponent],
})
export class ActionModule {}
