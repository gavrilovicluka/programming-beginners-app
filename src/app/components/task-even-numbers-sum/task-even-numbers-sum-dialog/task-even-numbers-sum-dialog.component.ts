import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskTextComponent } from '../../task-text/task-text.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-even-numbers-sum-dialog',
  standalone: true,
  imports: [CommonModule, TaskTextComponent, FormsModule],
  templateUrl: './task-even-numbers-sum-dialog.component.html',
  styleUrl: './task-even-numbers-sum-dialog.component.css'
})
export class TaskEvenNumbersSumDialogComponent {
  taskText!: string;
  userMessage: string = "";
  text!: string;
  goalValue!: number;
  currentSum: number = 0;
  currentNumbers: number[] = [];
  isFirstPartFinished: boolean = false;
  disableInput: boolean = false;
  secondStepStartFlag: boolean = true;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.taskText = state['taskText'];
    }

    this.text = "Sada možemo da krenemo sa zadatkom! <br><br> Ti ćeš da unosiš brojeve, a ja ću ti davati objašnjenja i reći kada je trenutak da se program završi na osnovu uslova zadatka. <br><br> Za početak unesi prvi parni broj:"

    this.goalValue = this.getNumberFromText(this.taskText);
  }

  sendMessage() {
    const number = this.getNumberFromText(this.userMessage);
    if (!this.isFirstPartFinished && number === -1) {
      this.text = "Moraš uneti neki broj!";
      this.userMessage = "";
      return;
    }

    // Drugi deo - pocetnik u ulozi programa
    if (this.isFirstPartFinished) {
      this.secondPart();
    } else if (this.isEven(number)) {
      // Prvi deo - pocetnik u ulozi korisnika
      this.firstPart(number);
    } else {
      this.text = "Broj koji si uneo/la nije paran. Pokušaj ponovo."
    }

    this.userMessage = "";
  }

  getNumberFromText(text: string): number {
    const messageSplit = text.split(' ');
    let number: number = -1;
    messageSplit.forEach(part => {
      if (!isNaN(parseInt(part))) {
        number = parseInt(part);
      }
    })

    return number;
  }

  isEven(num: number): boolean {
    if (num % 2 === 0) {
      return true;
    }
    return false;
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Pocetnik u ulozi korisnika
  firstPart(number: number) {
    const positiveReplies = ['Sjajno! ', 'Bravo! ', 'Super! ', 'Na pravom si putu! ', 'Odlično! '];
    const nextNumberMessages = ['Možeš da uneseš naredni broj! ', 'Očekujem unos sledećeg parnog broja! ', 'Nastavi sa unosom sledećeg broja! '];

    const positiveReply = positiveReplies[this.generateRandomNumber(0, positiveReplies.length - 1)];
    const nextNumberMessage = nextNumberMessages[this.generateRandomNumber(0, nextNumberMessages.length - 1)];


    this.currentSum += number;
    this.currentNumbers.push(number);

    let feedbackMessage = "";
    if (this.currentSum >= this.goalValue) {
      feedbackMessage = `Sada imamo ${this.currentNumbers}, što je ukupno ${this.currentSum}. To prelazi granicu od ${this.goalValue}, što znači da smo došli do kraja programa. <br><br> Sada možemo da promenimo uloge! Ja ću da ti dajem brojeve, a ti treba da odrediš kada je kraj programa. `;
      this.disableInput = true;

      setTimeout(() => {
        this.text = "Da li si spreman/a?";
        this.disableInput = false;
      }, 8000);

      this.isFirstPartFinished = true;
      this.currentNumbers = [];
      this.currentSum = 0;
    } else {
      feedbackMessage = positiveReply + `Sada imamo ${this.currentNumbers}, što je ukupno ${this.currentSum}. Još uvek nismo prešli granicu od ${this.goalValue}. <br><br>` + nextNumberMessage;
    }

    this.text = feedbackMessage;
  }

  // Pocetnik u ulozi programa
  secondPart() {
    const lowerCaseUserMessage = this.userMessage.toLowerCase();

    const positiveKeywords = ['da', 'jeste', 'jesam', 'spreman', 'naravno', 'moze', 'može', 'svakako'];
    const negativeKeywords = ['ne', 'nemam', 'nije', 'ne želim', 'necu', 'neću'];
    const evenKeywords = ['paran'];
    const oddKeywords = ['neparan'];
    const endKeywords = ['kraj', 'kraja', 'gotov', 'gotovo', 'zavrsen', 'zavrseno'];

    const isPositive = positiveKeywords.some(keyword => lowerCaseUserMessage.includes(keyword));
    const isNegative = negativeKeywords.some(keyword => lowerCaseUserMessage.includes(keyword));
    const hasEvenKeyword = evenKeywords.some(keyword => lowerCaseUserMessage.includes(keyword));
    const hasOddKeyword = oddKeywords.some(keyword => lowerCaseUserMessage.includes(keyword));
    const hasEndKeyword = endKeywords.some(keyword => lowerCaseUserMessage.includes(keyword));

    const generatedNumber: number = this.generateRandomNumber(1, 20);



    // secondStepStartFlag - 'vestacka inteligencija' zadaje prvi broj 
    if (this.secondStepStartFlag && isPositive) {
      this.text = `U redu, krećemo! Prvi broj je: ${generatedNumber}. <br><br> Reci mi kada misliš da je potrebno završiti program. `;
      this.currentNumbers.push(generatedNumber);
      this.secondStepStartFlag = false;
    }
    else if (this.secondStepStartFlag && isNegative) {
      this.text = 'Ukoliko imaš nejasnoća možeš se vratiti na prethodne korake i početi zadatak ispočetka. '
      this.secondStepStartFlag = false;
    }
    // Razmatranje mogucih odgovora korisnika
    else if (!this.secondStepStartFlag) {
      let reply: string = '';
      const usersSum: number = this.getNumberFromText(this.userMessage);
      const isEnd: boolean = this.currentSum >= this.goalValue;
      const lastNumber = this.currentNumbers[this.currentNumbers.length - 1];
      console.log(lastNumber)
      console.log(this.currentNumbers)


      // Ako korisnik unese i trenutnu sumu
      if (usersSum !== -1 && usersSum === this.currentSum) {
        reply = `Tačno, trenutna suma je ${this.currentSum}! <br><br>`;
      }

      if (isEnd) {
        // Ako je ispunjen uslov, a korisnik nije to napisao
        if (!hasEndKeyword || (negativeKeywords && hasEndKeyword)) {
          this.text = `Trebalo je da kažeš da je kraj programa jer ${this.currentSum} nije manje od ${this.goalValue}! To znači da završavamo sa unosom brojeva! <br><br> Možeš probati sa novim zadatkom tako što ćeš otići na početnu stranu! `;

        }
        // Ako je ispunjen uslov i korisnik je to napisao
        else {
          this.text = `Bravo! Zbir koji sada iznosi ${this.currentSum} nije više manji od ${this.goalValue}, što znači da si shvatio/la kada je zadatak gotov! <br><br> Čestitam!!! <br><br> Možeš probati sa novim zadatkom tako što ćeš otići na početnu stranu! `
        }

        this.disableInput = true;
        return;
      }
      else if (!this.isEven(lastNumber)) {
        this.currentNumbers.splice(this.currentNumbers.length - 1, 1);
        // Korisnik je napisao da uneti broj nije bio paran
        if (hasOddKeyword || (negativeKeywords && hasEvenKeyword)) {
          reply += 'Tako je, broj koji je unet nije paran! <br><br>';
        }
        // Korisnik nije napisao da je unet neparan broj
        else {
          reply += 'Nisi primetio/la da je broj koji je malopre unet neparan! <br><br>';
        }
      } else {
        // Korisnik odgovara da je unet neparan broj, a nije
        if (hasOddKeyword || (negativeKeywords && hasEvenKeyword)) {
          reply += 'Nije bio unet neparan broj! <br><br>';
        }
        // Korisnik odgovara da nije potrebno jos zavrsiti program
        else if (isNegative || (isNegative && hasEndKeyword)) {
          reply += 'Tako je, još uvek nije potrebno završiti program! <br><br>';
        }
      }

      this.text = reply + `Naredni broj koji unosim je: ${generatedNumber}. Brojevi koji su uneti su: ${this.currentNumbers}. <br><br> Koja je sada suma i da li treba zavrsiti program? `

      this.currentNumbers.push(generatedNumber);
      if (this.isEven(generatedNumber)) {
        this.currentSum += generatedNumber;
      }
    } else {
      this.text = 'Nisam siguran kako vam mogu pomoći.';
    }
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

}
