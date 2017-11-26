import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})

export class NewsPage {
  

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private document: DocumentViewer) {
      const options: DocumentViewerOptions = {
        title: 'My PDF'
      }
      this.document.viewDocument('assets/pdf-sample.pdf', 'application/pdf', options);
  }
  
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'TicSor',
      buttons: [
        {
          text: 'Cerrar Sesion',
          role: 'Close Sesion',
          handler: () => {
            console.log('Destructive clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
