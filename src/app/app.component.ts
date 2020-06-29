import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  showConfirm = null;
  async func1() {
    return await Promise.resolve('TEST');
  }
  async justAwait() {
    await Promise.resolve('TEST1');
    await Promise.resolve('TEST2');
    await Promise.resolve('TEST3');
    await Promise.resolve('TEST4');
    await Promise.resolve('TEST5');

    return 'z';
  }
  async func2() {
    return Promise.resolve('TEST');
  }
  func3() {
    return Promise.resolve('TEST');
  }
  async func4() {
    return 'TEST';
  }
  func5() {
    return 'TEST';
  }

  awaitFunc() {
    return this.func4().then(() => {
      console.log('A');
      return 'A'
    })
  };



  pressYes = null;
  pressNo = null;

  doConfirm() {
    // Promise.resolve();
    // Promise.reject();
    return new Promise((resolve, reject) => {
      this.pressYes = resolve;
      this.pressNo = reject;
      console.log('Promise Created');
    });
  }

  async runFunction() {
    console.log(1);
    const justAwait = this.justAwait().then((x) => { 
      console.log(x);
    });
    console.log(justAwait.then(() => { console.log('z printed')}));
    const resolvedPromise = this.awaitFunc().then(() => {
      console.log('B');
      return 'B'
    });

  let selection = null;
   try {
    this.showConfirm = true;
    selection = await this.doConfirm()
      .then((x) => {
        console.log(x);
        return x;
      })
      .catch((x) => {
        console.log(x);
        return x;
      }).then((x: string)=> {
        throw (x + 1);
      });
   } catch (e) {
      console.log('err', e);
   } finally {
      console.log(selection);
      this.showConfirm = false;
   }

    console.log(resolvedPromise);
    if (selection === 'Yes') {
      console.log(2);
      return;
    }

    resolvedPromise.then(() => {
      console.log('C');
      return 'C'
    });

    await justAwait.then(() => { console.log('z printed again')});
    console.log(3);
    console.log(await resolvedPromise.then(() => {
      console.log('D');
      return 'D'
    }))
    console.log(4);
    justAwait.then(() => { console.log('z printed yet again')})
    resolvedPromise.then(() => {
      console.log('E');
      return 'E'
    });
    console.log(5);
    // console.log(5, this.func5());
  }
}
