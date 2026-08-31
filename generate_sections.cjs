const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf8');

// Find where the Hero Form ends
const heroFormEndStr = `</form>\n          </div>\n        </div>\n      </FadeIn>\n      </section>`;

// Wait, the current App.tsx does NOT have `</FadeIn></section>` after the form because it was deleted!
// The current App.tsx ends with `</form>          </div>        </div>      )}            {packageSuccess && <Toast message="Package booked! We'll contact you shortly." onClose={() => setPackageSuccess(false)} />}    </div>  );}`

// So I will just split at `</form>`
const parts = content.split('</form>');
// parts[0] is everything up to the inside of the Hero form (which is currently the Modal form).
// wait, let's just re-write App.tsx using a template!
