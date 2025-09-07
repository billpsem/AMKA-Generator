const form = document.getElementById('form');
    const input = document.getElementById('num');
    const error = document.getElementById('error');
    const result = document.getElementById('result');
    const resetBtn = document.getElementById('reset');
    const example = document.getElementById('example');

    function validate(value){
      if(!/^[0-9]{11}$/.test(value)){
        return 'Η είσοδος πρέπει να περιέχει **ακριβώς** 11 ψηφία (0-9).';
      }
      return '';
    }

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      error.textContent = '';
      result.hidden = true;

      const val = input.value.trim();
      const vErr = validate(val);
      if(vErr){
        error.textContent = vErr;
        return;
      }

      try{
        const n = BigInt(val);
        const sum = n + 8n;
        result.textContent = `Αποτέλεσμα: ${sum.toString()}`;
        result.hidden = false;
      }catch(err){
        error.textContent = 'Συνέβη σφάλμα στην επεξεργασία του αριθμού.';
      }
    });

    resetBtn.addEventListener('click', ()=>{
      input.value = '';
      error.textContent = '';
      result.hidden = true;
    });

    input.addEventListener('input', ()=>{
      input.value = input.value.replace(/\\D/g,'').slice(0,11);
    });

    // Αντιγραφή στο clipboard όταν γίνει κλικ στο Example AMKA
    example.addEventListener('click', ()=>{
      navigator.clipboard.writeText('10040303033').then(()=>{
        example.textContent = 'Αντιγράφηκε: 10040303033';
        setTimeout(()=>{
          example.textContent = 'Example AMKA: 10040303033';
        },2000);
      });
    });

    // Αντιγραφή στο clipboard όταν γίνει κλικ στο αποτέλεσμα
    result.addEventListener('click', ()=>{
      const text = result.textContent.replace('Αποτέλεσμα: ','').trim();
      if(text){
        navigator.clipboard.writeText(text).then(()=>{
          const old = result.textContent;
          result.textContent = `Αντιγράφηκε: ${text}`;
          setTimeout(()=>{
            result.textContent = old;
          },2000);
        });
      }
    });