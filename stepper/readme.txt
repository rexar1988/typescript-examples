Пример stepper 1 в 1 как тут https://material.angular.io/components/stepper/overview#stepper-variants

TypeScript

  nodeTypeForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    machineName: [null, [Validators.required]],
    description: [null],
    instructions: [null]
  });
  nodeFieldsForm: FormGroup = this.formBuilder.group({
    newField: ['default'],
    existingField: ['default'],
    fields: this.formBuilder.array([])
  });


HTML

    <app-vertical-stepper>
      <app-step [stepControl]="nodeFieldsForm">
        <ng-template class="node-type__form-label" appStepperLabel>Step 2: Add Fields</ng-template>
        <form [formGroup]="nodeFieldsForm" class="node-type__form">
          <div class="node-type__add-field">
            <div class="node-type__add-field-col node-type__add-field-col--new">
              <label for="new-field-select" class="form-label">Add new field</label>
              <div class="node-type__add-field-content">
                <select formControlName="newField" id="new-field-select" class="form-control form-control--select">
                  <option value="default">Choose field</option>
                  <optgroup label="General">
                    <option value="5">Email</option>
                    <option value="17">Time</option>
                    <option value="4">Date</option>
                    <option value="3">Comments</option>
                    <option value="2">Boolean</option>
                    <option value="13">Meta tag</option>
                    <option value="11`">Link</option>
                  </optgroup>
                  <optgroup label="Link">
                    <option value="1">Article</option>
                    <option value="16">Taxonomy term</option>
                    <option value="8">Web form</option>
                    <option value="18">User</option>
                    <option value="10">Image</option>
                    <option value="6">File</option>
                  </optgroup>
                  <optgroup label="Текст">
                    <option value="15">Simple text</option>
                    <option value="9">Formatted text</option>
                  </optgroup>
                  <optgroup label="Число">
                    <option value="14">Number</option>
                    <option value="7">Float number</option>
                  </optgroup>
                </select>
                <div class="node-type__add-text">Or add existing</div>
              </div>
              <app-button-primary [disabled]="nodeFieldsForm.get('newField').value === 'default'" (buttonClick)="addNewField()">Add new Field</app-button-primary>
            </div>
            <div class="node-type__add-field-col node-type__add-field-col--existing">
              <label for="existing-field-select" class="form-label">Add existing field</label>
              <div class="node-type__add-field-content">
                <select formControlName="existingField" id="existing-field-select" class="form-control form-control--select">
                  <option value="default">Choose existing field</option>
                  <option *ngFor="let field of existingFields" [value]="field.machineName">{{ field.name }}</option>
                </select>
              </div>
              <app-button-primary [disabled]="nodeFieldsForm.get('existingField').value === 'default'" (buttonClick)="addExistingField()">Add existing field</app-button-primary>
            </div>
          </div>
          <div class="node-type__fields" formArrayName="fields">
            <h3 class="node-type__fields-title">Added fields</h3>
            <table>
              <thead>
              <tr>
                <th>Actions</th>
                <th>Status</th>
                <th>Name</th>
                <th>Machine name</th>
                <th>Field type</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
              </tr>
              </tbody>
            </table>
            <div class="node-type__field" *ngFor="let field of nodeFieldsFormArray.controls; let index = index">
              <ng-container [formGroupName]="index.toString()">
                <p>{{ field.value.name }}</p>
                <div class="node-type__form-item node-type__form-item--input">
                  <app-form-input class="node-type__form-control" formControlName="name" label="Name"></app-form-input>
                </div>
                <div class="node-type__form-item node-type__form-item--input">
                  <app-form-input class="node-type__form-control" formControlName="machineName" label="Machine Name"></app-form-input>
                </div>
              </ng-container>
            </div>
          </div>
          <footer class="node-type__form-footer">
            <app-step-button class="node-type__btn-step" type="prev" appStepperPrev>Prev step</app-step-button>
            <app-step-button class="node-type__btn-step" appStepperNext>Create Node Type</app-step-button>
          </footer>
        </form>
      </app-step>
      <app-step [stepControl]="nodeTypeForm">
        <ng-template class="node-type__form-label" appStepperLabel>Step 1: Create Node Type</ng-template>
        <form [formGroup]="nodeTypeForm" (ngSubmit)="onNodeTypeCreate()" class="node-type__form">
          <div class="node-type__form-item node-type__form-item--input">
            <app-form-input class="node-type__form-control" formControlName="name" label="Name *"></app-form-input>
            <div class="node-type__form-message"
                 *ngIf="nodeTypeForm.get('name').hasError('required') && nodeTypeForm.get('name').touched"
                 [@formMessages]>
              <app-form-message>{{ formMessages.required }}</app-form-message>
            </div>
          </div>
          <div class="node-type__form-item node-type__form-item--input">
            <app-form-input class="node-type__form-control" formControlName="machineName"
                            label="Machine Name *"></app-form-input>
            <div class="node-type__form-message"
                 *ngIf="nodeTypeForm.get('machineName').hasError('required') && nodeTypeForm.get('machineName').touched"
                 [@formMessages]>
              <app-form-message>{{ formMessages.required }}</app-form-message>
            </div>
          </div>
          <div class="node-type__form-item">
            <app-form-textarea class="node-type__form-control" formControlName="description" label="Description"></app-form-textarea>
          </div>
          <div class="node-type__form-item">
            <app-form-textarea class="node-type__form-control" formControlName="instructions" label="Instructions"></app-form-textarea>
          </div>
          <footer class="node-type__form-footer">
            <app-button-primary class="node-type__form-btn" appStepperNext>Add fields</app-button-primary>
            <app-button-secondary class="node-type__form-btn" type="submit">Create Node Type</app-button-secondary>
          </footer>
        </form>
      </app-step>
      <app-step [stepControl]="nodeFieldsForm">
        <ng-template class="node-type__form-label" appStepperLabel>Create Node Type</ng-template>
        <p>тут будет нода и список полей</p>
        <button>Submit</button>
      </app-step>
    </app-vertical-stepper>
