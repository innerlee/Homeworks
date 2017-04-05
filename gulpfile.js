"use strict";
let gulp = require('gulp');
let cp = require('child_process');
let gutil = require('gulp-util');
let fs = require("fs")

// modify this to your main .tex file
let f = 'bf';

gulp.task('default', function() {
  gutil.log('please wait...')
  cp.exec('pdflatex -interaction=nonstopmode ' + f, (error, stdout, stderr) => {
    if (error !== null) {
      gutil.log(`exec error: ${error}`);
      console.log(' ');
      fs.readFile(f + ".log", "utf-8", (err, _data) => console.log(_data));
      return;
    }
    gutil.log('bibtexing...');
    cp.exec('bibtex ' + f + ' > bib.log', (error, stdout, stderr) => {
      if (error !== null) {
        gutil.log(`exec error: ${error}`);
        console.log(' ');
        fs.readFile("bib.log", "utf-8", (err, _data) => console.log(_data));
        return;
      }
      gutil.log('pdflatexing...');
      cp.exec('pdflatex -interaction=nonstopmode ' + f, (error, stdout, stderr) => {
        if (error !== null) {
          gutil.log(`exec error: ${error}`);
          console.log(' ');
          fs.readFile(f + ".log", "utf-8", (err, _data) => console.log(_data));
          return;
        }
        gutil.log('pdflatexing...');
        cp.exec('pdflatex -interaction=nonstopmode ' + f, (error, stdout, stderr) => {
          if (error !== null) {
            gutil.log(`exec error: ${error}`);
            console.log(' ');
            fs.readFile(f + ".log", "utf-8", (err, _data) => console.log(_data));
            return;
          }
          cp.exec('start ' + f + '.pdf ', (error, stdout, stderr) => {
            gutil.log(`opening ${f}.pdf`);
            gutil.log('love bufan.');
            cp.exec('code .')
          });
        });
      });
    });
  });
});
