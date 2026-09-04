import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
} from '@angular/core';

import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[phHasRole]',
  standalone: true,
})
export class HasRoleDirective {

  private readonly authService =
    inject(AuthService);

  private readonly templateRef =
    inject(TemplateRef<unknown>);

  private readonly viewContainer =
    inject(ViewContainerRef);

  private requiredRoles: string[] = [];

  private hasView = false;

  constructor() {

    // console.error(
    //   '=== HAS ROLE DIRECTIVE CREATED ==='
    // );

    effect(() => {

      // console.error(
      //   '=== EFFECT RUNNING ==='
      // );

      this.authService.roles();

      // this.updateView();
    });
  }

  @Input()
  set phHasRole(
    value: string | string[] | null | undefined
  ) {

    // console.error(
    //   '=== phHasRole INPUT ===',
    //   value
    // );

    this.requiredRoles =
      Array.isArray(value)
        ? value
        : value
          ? [value]
          : [];

    this.updateView();
  }

  private updateView(): void {

    const userRoles =
      this.authService.getRoles();

    // console.error(
    //   'USER ROLES:',
    //   userRoles
    // );

    // console.error(
    //   'REQUIRED ROLES:',
    //   this.requiredRoles
    // );

    const allowed =
      this.requiredRoles.some(
        role =>
          userRoles.includes(role)
      );

    // console.error(
    //   'ALLOWED:',
    //   allowed
    // );

    if (
      allowed &&
      !this.hasView
    ) {

      this.viewContainer
        .createEmbeddedView(
          this.templateRef
        );

      this.hasView = true;

    } else if (
      !allowed &&
      this.hasView
    ) {

      this.viewContainer.clear();

      this.hasView = false;
    }
  }
}