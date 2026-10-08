'use strict';
// Apenas validação demonstrativa: para login real é necessário backend.
document.getElementById('formLogin')?.addEventListener('submit', (evento)=>{
  evento.preventDefault();
  const formulario=evento.currentTarget;
  const email=document.getElementById('email');
  const senha=document.getElementById('senha');
  const feedback=document.getElementById('feedbackLogin');
  if(!formulario.checkValidity()){
    feedback.textContent='Digite um e-mail válido e uma senha com pelo menos 6 caracteres.';
    formulario.classList.add('was-validated');return;
  }
  feedback.textContent='Campos validados! A autenticação ainda não foi implementada.';
  senha.value='';
});
