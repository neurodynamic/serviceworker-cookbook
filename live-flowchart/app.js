'use strict'; // to support classes in Chrome (Version 48.0.2527.0 canary (64-bit))

// import Logger from 'logger'; // not supported in Chrome (Version 48.0.2527.0 canary (64-bit))
// import SWUtil from 'sw-util'; // not supported in Chrome (Version 48.0.2527.0 canary (64-bit))

class App {

  constructor() {
    const _self = this;

    Logger.log('App()');

    // instatiate a new Service Worker Utility Class
    this.swUtil = new SWUtil();

    // register click events
    if (this.swUtil.areServiceWorkersSupported()) {
      document.querySelector('#swinstall').addEventListener('click', () => {
        Logger.log('\n-------\n');
        _self.enableCoolFeatures();
      });

      document.querySelector('#reloadapp').addEventListener('click', () => {
        window.location.reload();
      });

      document.querySelector('#swuninstall').addEventListener('click', () => {
        Logger.log('\n-------\n');
        _self.disableCoolFeatures();
      });

      if (this.swUtil.isServiceWorkerControllingThisApp()) {
        Logger.info('App code run as expected');

        this.disableServiceWorkerRegistration();
      } else {
        this.enableServiceWorkerRegistration();
      }
    } else {
      Logger.error('Service workers are not supported by this browser');
      Logger.error(navigator.userAgent);
    }
  }

  enableCoolFeatures() {
    Logger.log('\nApp.enableCoolFeatures()');

    Logger.log('Configuring service worker');

    this.swUtil.registerServiceWorker(
      () => {  // success
        this.disableServiceWorkerRegistration();
      },
      () => {  // error
        this.enableServiceWorkerRegistration();
      }
    );
  }

  disableCoolFeatures() {
    Logger.log('\nApp.disableCoolFeatures()');

    this.swUtil.unregisterServiceWorker(
      () => {  // success
        this.enableServiceWorkerRegistration();
      },
      () => {  // error
        this.enableServiceWorkerRegistration();
      }
    );
  }

  enableServiceWorkerRegistration() {
    document.querySelector('#swinstall').disabled = false;
    document.querySelector('#swuninstall').disabled = true;
  }

  disableServiceWorkerRegistration() {
    document.querySelector('#swinstall').disabled = true;
    document.querySelector('#swuninstall').disabled = false;
  }
}
