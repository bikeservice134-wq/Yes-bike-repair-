const fs = require('fs');

const appHeader = fs.readFileSync('src/App.tsx', 'utf8').split('</form>')[0];
// Wait, I can't just split by form if the file is ruined.
// It's easier if I just download my backup if I had one...
// But wait, my terminal history has all the sed output! 
// Let's just create a new `App.tsx` completely.
