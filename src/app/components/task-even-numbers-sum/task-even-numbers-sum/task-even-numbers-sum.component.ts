import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskTextComponent } from '../../task-text/task-text.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-even-numbers-sum',
  standalone: true,
  imports: [CommonModule, TaskTextComponent, FormsModule],
  templateUrl: './task-even-numbers-sum.component.html',
  styleUrl: './task-even-numbers-sum.component.css'
})
export class TaskEvenNumbersSumComponent implements OnInit {
  taskText!: string;
  step1Text: string = "";
  step2Text: string = "";
  step2: boolean = false;
  numbers: number[] = [];
  selectedNumbers: number[] = [];
  validSelection: boolean = false;
  evenNumbers: number = 0;
  numberArrays: number[][] = [];
  selectedArrays: number[][] = [];
  numOfTargetArrays: number = 0;
  newMessageAnimation: boolean = false;
  userMessage!: string;
  helpTimeout: any;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.taskText = state['taskText'];
    }
  }

  ngOnInit(): void {
    this.step1Text = "Kao što vidiš u tekstu zadatka, potrebna je suma parnih brojeva. Za početak izaberi sve parne brojeve!"
    this.step2Text = "Sada odredi sve nizove čiji je zbir manji od broja 58."
    this.generateRandomNumbers();
    this.generateRandomArray();
    this.offerHelp(8000);
  }

  generateRandomNumbers() {
    for (let i = 0; i < 10; i++) {
      let newNumber = this.generateRandomNumber(1, 50);

      while (this.numbers.includes(newNumber)) {
        newNumber = this.generateRandomNumber(1, 50);
      }

      this.numbers.push(newNumber);

      if (newNumber % 2 === 0) {
        this.evenNumbers++;
      }
    }
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectNumber(num: number) {
    const index = this.selectedNumbers.indexOf(num);

    if (index === -1) {
      this.selectedNumbers.push(num);
    } else {
      this.selectedNumbers.splice(index, 1);
    }

    this.checkEvenNumbers();
  }

  checkEvenNumbers() {
    let selectedEvenNumbers = 0;
    let selectedOddNumbers = 0;
    this.selectedNumbers.forEach(number => {
      if (number % 2 === 0) {
        selectedEvenNumbers++;
      } else {
        selectedOddNumbers++;
        this.validSelection = false;
        return;
      }
    })

    if (selectedOddNumbers === 0 && selectedEvenNumbers === this.evenNumbers) {
      this.validSelection = true;
    } else {
      this.validSelection = false;
    }
  }

  generateRandomArray() {
    for (let i = 0; i < 10; i++) {
      const newArray: number[] = [];
      for (let j = 0; j < 4; j++) {
        newArray.push(this.generateRandomNumber(1, 30));
      }
      this.numberArrays.push(newArray);
    }

    const arraysWithGreaterSum = this.numberArrays.map(arr => arr.reduce((acc, num) => acc + num, 0) < 58);
    this.numOfTargetArrays = arraysWithGreaterSum.filter(ar => ar).length;

    // Da sigurno postoji bar jedan niz sa sumom elemenata manjom od 58
    if (this.numOfTargetArrays === 0) {
      this.numberArrays.pop();
      const newArray: number[] = [];
      for (let j = 0; j < 4; j++) {
        newArray.push(this.generateRandomNumber(1, 15));
      }
      this.numberArrays.push(newArray);
    }

  }

  selectArray(array: number[]) {
    let index = -1;
    for (let i = 0; i < this.selectedArrays.length; i++) {
      if (this.isEqualArrays(this.selectedArrays[i], array)) {
        index = i;
      }
    }

    if (index === -1) {
      this.selectedArrays.push(array);
    } else {
      this.selectedArrays.splice(index, 1);
    }

    this.checkArraysSum();
  }

  isEqualArrays(array1: number[], array2: number[]) {
    if (!array1 || !array2 || array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }

    return true;
  }

  checkArraysSum(): void {
    const isGoodSelection = this.selectedArrays.every(array => array.reduce((acc, num) => acc + num, 0) < 58);
    if (isGoodSelection && this.selectedArrays.length === this.numOfTargetArrays) {
      this.validSelection = true;
    } else {
      this.validSelection = false;
    }
  }

  isSelectedArray(array: number[]) {
    for (let i = 0; i < this.selectedArrays.length; i++) {
      if (this.isEqualArrays(this.selectedArrays[i], array)) {
        return true;
      }
    }
    return false;
  }

  offerHelp(ms: number) {
    this.helpTimeout = setTimeout(() => {
      this.step1Text = "Da li ti je potrebna pomoć?";

      if (this.step2) {
        this.step2Text = "Da li ti je potrebna pomoć?";
      }
    }, ms);
  }

  nextStep() {
    if(this.step2) {
      this.router.navigateByUrl('/even-numbers-sum-dialog', {
        state: { taskText: this.taskText }
      });
    }
    this.step2 = true;
    this.validSelection = false;
    this.newMessageAnimation = true;

    if(this.helpTimeout) {
      clearTimeout(this.helpTimeout);
    }
    this.offerHelp(10000);
  }

  sendMessage() {
    const lowerCaseUserMessage = this.userMessage.toLowerCase();

    const positiveKeywords = ['da', 'jeste', 'naravno', 'moze', 'može', 'svakako', 'sigurno', 'pomoć', 'pomoc', 'pomogni', 'treba'];
    const negativeKeywords = ['ne', 'nemam', 'nije', 'ne želim', 'necu', 'neću'];

    const isPositive = positiveKeywords.some(keyword => lowerCaseUserMessage.includes(keyword));
    const isNegative = negativeKeywords.some(keyword => lowerCaseUserMessage.includes(keyword));

    // Pomoc za odredjivanje parnih brojeva
    if (isPositive) {
      this.step1Text = 'Parni brojevi su oni brojevi koji daju ostatak 0 pri deljenju sa 2 (npr. 2, 4, 6...).';
    } else if (isNegative) {
      this.step1Text = 'U redu! Možeš nastaviti sa traženjem parnih brojeva!'
    } else {
      this.step1Text = 'Nisam siguran kako vam mogu pomoći.';
    }

    // Pomoc za odredjivanje sume brojeva
    if (this.step2) {
      if (isPositive) {
        this.step2Text = 'Potrebno je da uzimaš element po element iz niza i računaš zbir svih elemenata koje si trenutno uzeo. Ukoliko taj zbir bude jednak ili veći od 58, odmah možeš eliminisati taj niz. Ukoliko si prošao sve elemente iz niza i zbir je manji od 58, to znači da je to niz koji treba da izabereš!';
      } else if (isNegative) {
        this.step2Text = 'U redu! Možeš nastaviti sa traženjem nizova čiji je zbir elemenata manji od 58!'
      } else {
        this.step2Text = 'Nisam siguran kako vam mogu pomoći.';
      }
    }

    this.userMessage = '';
  }

}
