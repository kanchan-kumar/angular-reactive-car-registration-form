import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Observer} from "rxjs";
import {CarBrand, AutoParts, UserRegistrationData} from "./models";
import {CarDataService} from "./car-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy{

  carRegistration: FormGroup;
  listOfCarBrands: string[] = [];
  listOfAutoParts: string[] = [];
  color = '#FFF';
  registrationData: UserRegistrationData | undefined;

  constructor(private fb: FormBuilder,
              private carDataService: CarDataService) {
    this.carRegistration = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(75)], [this.fullNameValidation]],
      brands: [[], [Validators.required]],
      autoParts: [[], [Validators.required]]
    });

    this.carRegistration.valueChanges.subscribe(
      value => {
        this.registrationData = {
          name: value.fullName,
          brand: value.brands,
          autoParts: value.autoParts,
          color: this.color
        };
    });
  }

  ngOnInit(): void {
    this.carDataService.getCarModels().subscribe( {
      next: (carBrands: CarBrand[]) => {
        this.listOfCarBrands = carBrands.map(value => value.brand);
      },
      error: () => {}
    });

    this.carDataService.getAutoParts().subscribe({
      next: (autoParts: AutoParts[]) => {
        this.listOfAutoParts = autoParts.map(value => value["List of auto parts"]);
      },
      error: () => {
      }
    });;
  }

  fullNameValidation = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {

        if (!/^[a-zA-Z ]*$/g.test(control.value)) {
          observer.next({invalidName: true});
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    }
    return {};
  };

  saveSelectedColor = (data: string) => {
    this.color = data;
    if (this.registrationData) {
      this.registrationData.color = this.color;
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.carRegistration.reset();
    for (const key in this.carRegistration.controls) {
      if (this.carRegistration.controls.hasOwnProperty(key)) {
        this.carRegistration.controls[key].markAsPristine();
        this.carRegistration.controls[key].updateValueAndValidity();
      }
    }
    this.registrationData = undefined;
    this.color = '#FFF';
  }

  submitForm(): void {
    console.log('Submitting User Registration Form with Values:  ', this.registrationData)
    this.carDataService.submitCarRegistrationForm(this.registrationData).subscribe({
      next: () => console.log('Form submitted successfully'),
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy(): void {
  }

}
