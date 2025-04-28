
// Script para la página de juegos

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Si no hay usuario autenticado, redirigir al login
        window.location.href = '../../index.html';
        return;
    }
    
    // Mostrar nombre de usuario
    const userGreeting = document.getElementById('user-greeting');
    if (userGreeting) {
        userGreeting.textContent = `Hola, ${currentUser.name || currentUser.username}`;
    }
    
    // Manejar cierre de sesión
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Eliminar información de usuario actual
            localStorage.removeItem('currentUser');
            // Redirigir al login
            window.location.href = '../../index.html';
        });
    }
    
    // ================= JUEGO DE TRIVIA =================
    
    // Preguntas para el juego de trivia
    const triviaQuestions = [
        {
            question: "¿Qué es el bullying?",
            options: [
                "Un conflicto normal entre compañeros",
                "Un comportamiento agresivo, intencional y repetitivo en un desequilibrio de poder",
                "Una broma entre amigos",
                "Un evento aislado de agresión"
            ],
            correct: 1,
            feedback: "El bullying es un comportamiento agresivo, intencional y repetitivo que ocurre en un desequilibrio de poder entre quien agrede y la víctima."
        },
        {
            question: "¿Cuál de las siguientes NO es una forma de bullying?",
            options: [
                "Excluir deliberadamente a alguien de actividades",
                "Difundir rumores sobre otra persona",
                "Tener un desacuerdo respetuoso sobre un tema",
                "Enviar mensajes ofensivos en redes sociales"
            ],
            correct: 2,
            feedback: "Tener un desacuerdo respetuoso no es bullying. El bullying implica una intención de hacer daño."
        },
        {
            question: "¿Qué es el cyberbullying?",
            options: [
                "Usar tecnología para realizar tareas escolares",
                "Usar dispositivos electrónicos durante la clase",
                "El acoso que ocurre a través de medios digitales como redes sociales o mensajes",
                "Jugar videojuegos violentos"
            ],
            correct: 2,
            feedback: "El cyberbullying es el acoso que ocurre a través de medios digitales como redes sociales, mensajes de texto, correos electrónicos o aplicaciones."
        },
        {
            question: "¿Qué deberías hacer si eres testigo de una situación de bullying?",
            options: [
                "Ignorarlo, no es tu problema",
                "Unirte para no convertirte tú en víctima",
                "Grabarlo y compartirlo en redes sociales",
                "Apoyar a la víctima y reportar el incidente a un adulto"
            ],
            correct: 3,
            feedback: "Lo correcto es apoyar a la víctima y reportar el incidente a un adulto de confianza. Los testigos tienen un papel importante en detener el bullying."
        },
        {
            question: "¿Cuál es una posible señal de que alguien está sufriendo bullying?",
            options: [
                "Tiene muchos amigos nuevos",
                "Muestra más confianza en sí mismo",
                "Evita ir a la escuela o ciertas actividades",
                "Mejora en sus calificaciones"
            ],
            correct: 2,
            feedback: "Evitar ir a la escuela o ciertas actividades puede ser una señal de que alguien está sufriendo bullying. También pueden presentarse cambios en el humor, pérdida de apetito o problemas para dormir."
        },
        {
            question: "¿Qué pueden hacer los padres si sospechan que su hijo está siendo víctima de bullying?",
            options: [
                "Decirle que se defienda usando violencia",
                "Ignorar la situación, seguramente se resolverá sola",
                "Castigar al niño por no defenderse",
                "Escuchar sin juzgar y contactar a la escuela para abordar el problema"
            ],
            correct: 3,
            feedback: "Los padres deben escuchar a sus hijos sin juzgar y trabajar con la escuela para resolver el problema. La comunicación y el apoyo son fundamentales."
        },
        {
            question: "¿Qué habilidad es importante desarrollar para prevenir el bullying?",
            options: [
                "Habilidad para ignorar a los demás",
                "Empatía y respeto por los demás",
                "Capacidad para intimidar primero",
                "Habilidad para pasar desapercibido"
            ],
            correct: 1,
            feedback: "La empatía, o la capacidad de ponerse en el lugar de otra persona, es fundamental para prevenir el bullying y construir relaciones respetuosas."
        },
        {
            question: "¿Por qué algunas personas no reportan situaciones de bullying?",
            options: [
                "Porque no les importa",
                "Porque disfrutan viendo el bullying",
                "Por miedo a represalias o a ser etiquetados como 'soplones'",
                "Porque el bullying es aceptable"
            ],
            correct: 2,
            feedback: "Muchas personas no reportan el bullying por miedo a represalias, a ser etiquetados como 'soplones' o porque creen que la situación empeorará si hablan."
        },
        {
            question: "¿Cuál es una consecuencia a largo plazo que puede sufrir una víctima de bullying?",
            options: [
                "Mayor popularidad",
                "Mejor rendimiento académico",
                "Problemas de ansiedad y baja autoestima",
                "Mayor facilidad para hacer amigos"
            ],
            correct: 2,
            feedback: "Las víctimas de bullying pueden sufrir consecuencias a largo plazo como ansiedad, depresión, baja autoestima y dificultades para confiar en los demás."
        },
        {
            question: "¿Qué mensaje es importante transmitir a alguien que ha sufrido bullying?",
            options: [
                "Que debería aprender a defenderse físicamente",
                "Que el bullying es parte normal de crecer",
                "Que no es su culpa y merece respeto",
                "Que debería evitar llamar la atención"
            ],
            correct: 2,
            feedback: "Es fundamental transmitir que el bullying nunca es culpa de la víctima y que todos merecemos ser tratados con respeto y dignidad."
        }
    ];
    
    // Variables para el juego de trivia
    let currentTrivia = 0;
    let triviaScore = 0;
    let triviaSelected = false;
    
    // Iniciar juego de trivia
    document.querySelector('[data-game="trivia"]').addEventListener('click', function() {
        document.getElementById('trivia-start').style.display = 'none';
        document.getElementById('trivia-play').style.display = 'block';
        
        // Configurar contadores
        document.getElementById('trivia-total').textContent = triviaQuestions.length;
        
        // Mostrar primera pregunta
        showTriviaQuestion(0);
    });
    
    // Función para mostrar pregunta de trivia
    function showTriviaQuestion(index) {
        currentTrivia = index;
        triviaSelected = false;
        
        const question = triviaQuestions[index];
        document.getElementById('trivia-current').textContent = index + 1;
        document.getElementById('trivia-question').textContent = question.question;
        
        // Crear opciones
        const optionsContainer = document.getElementById('trivia-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.dataset.index = i;
            
            button.addEventListener('click', function() {
                if (triviaSelected) return; // Evitar múltiples selecciones
                
                triviaSelected = true;
                const selectedIndex = parseInt(this.dataset.index);
                
                // Marcar todas las opciones como seleccionadas, correctas o incorrectas
                document.querySelectorAll('.option-btn').forEach((btn, btnIndex) => {
                    if (btnIndex === selectedIndex) {
                        btn.classList.add('selected');
                    }
                    
                    if (btnIndex === question.correct) {
                        btn.classList.add('correct');
                    } else if (btnIndex === selectedIndex) {
                        btn.classList.add('incorrect');
                    }
                });
                
                // Actualizar puntuación
                if (selectedIndex === question.correct) {
                    triviaScore += 10;
                    document.getElementById('trivia-score').textContent = triviaScore;
                }
                
                // Mostrar retroalimentación
                const feedback = document.getElementById('trivia-feedback');
                feedback.textContent = question.feedback;
                feedback.style.display = 'block';
                
                // Mostrar botón para siguiente pregunta o finalizar
                const nextButton = document.getElementById('trivia-next');
                if (currentTrivia < triviaQuestions.length - 1) {
                    nextButton.textContent = 'Siguiente Pregunta';
                    nextButton.onclick = function() {
                        showTriviaQuestion(currentTrivia + 1);
                        feedback.style.display = 'none';
                        nextButton.style.display = 'none';
                    };
                } else {
                    nextButton.textContent = 'Ver Resultados';
                    nextButton.onclick = function() {
                        endTriviaGame();
                    };
                }
                nextButton.style.display = 'inline-block';
            });
            
            optionsContainer.appendChild(button);
        });
    }
    
    // Función para finalizar juego de trivia
    function endTriviaGame() {
        document.getElementById('trivia-play').style.display = 'none';
        document.getElementById('trivia-result').style.display = 'block';
        document.getElementById('trivia-final-score').textContent = triviaScore;
        
        // Mensaje según puntuación
        const messageElement = document.getElementById('trivia-message');
        if (triviaScore >= 80) {
            messageElement.innerHTML = '<p>¡Excelente! Tienes un gran conocimiento sobre el bullying. ¡Sigue aprendiendo y compartiendo lo que sabes para crear un ambiente más seguro!</p>';
        } else if (triviaScore >= 50) {
            messageElement.innerHTML = '<p>¡Buen trabajo! Conoces bastante sobre el bullying, pero todavía hay cosas que puedes aprender. ¡Sigue explorando las otras secciones!</p>';
        } else {
            messageElement.innerHTML = '<p>¡Buen intento! Has aprendido algunas cosas sobre el bullying, pero te animamos a explorar más las otras secciones para ampliar tu conocimiento.</p>';
        }
    }
    
    // Reiniciar juego de trivia
    document.querySelector('[data-game="trivia"].restart-btn').addEventListener('click', function() {
        currentTrivia = 0;
        triviaScore = 0;
        document.getElementById('trivia-score').textContent = triviaScore;
        document.getElementById('trivia-result').style.display = 'none';
        document.getElementById('trivia-play').style.display = 'block';
        showTriviaQuestion(0);
    });
    
    // ================= JUEGO DE VERDADERO O FALSO =================
    
    // Afirmaciones para el juego de verdadero o falso
    const trueFalseStatements = [
        {
            statement: "El bullying solo incluye agresiones físicas.",
            isTrue: false,
            explanation: "Falso. El bullying puede ser físico, verbal, social (exclusión, rumores) o cibernético (en línea)."
        },
        {
            statement: "Los testigos de bullying juegan un papel importante para detenerlo.",
            isTrue: true,
            explanation: "Verdadero. Los testigos pueden marcar la diferencia al defender a la víctima, no unirse al agresor y reportar el incidente."
        },
        {
            statement: "Las bromas entre amigos siempre son bullying.",
            isTrue: false,
            explanation: "Falso. Las bromas entre amigos donde todos se divierten no son bullying. El bullying implica intención de hacer daño y un desequilibrio de poder."
        },
        {
            statement: "El cyberbullying puede ocurrir 24/7 y puede ser más dañino porque puede llegar a una audiencia más amplia.",
            isTrue: true,
            explanation: "Verdadero. El cyberbullying puede ocurrir en cualquier momento y puede ser particularmente dañino debido a su potencial alcance y permanencia digital."
        },
        {
            statement: "Si ves bullying, lo mejor es no involucrarte para evitar problemas.",
            isTrue: false,
            explanation: "Falso. Aunque no debes ponerte en peligro, ignorar el bullying lo perpetúa. Puedes ayudar reportándolo a un adulto o apoyando a la víctima."
        },
        {
            statement: "El bullying puede tener efectos negativos a largo plazo en la salud mental.",
            isTrue: true,
            explanation: "Verdadero. El bullying puede causar ansiedad, depresión, baja autoestima y otros problemas de salud mental a largo plazo."
        },
        {
            statement: "Una persona que sufre bullying debería enfrentarse físicamente al agresor.",
            isTrue: false,
            explanation: "Falso. Responder con violencia no es la solución y puede empeorar la situación. Es mejor buscar ayuda de adultos y utilizar estrategias no violentas."
        },
        {
            statement: "Desarrollar empatía puede ayudar a prevenir el bullying.",
            isTrue: true,
            explanation: "Verdadero. La empatía nos ayuda a entender cómo nuestras acciones afectan a los demás, lo que puede prevenir comportamientos de bullying."
        },
        {
            statement: "El bullying es solo un problema de niños pequeños.",
            isTrue: false,
            explanation: "Falso. El bullying puede ocurrir a cualquier edad, desde la infancia hasta la edad adulta, aunque las formas pueden variar."
        },
        {
            statement: "Las escuelas que implementan programas anti-bullying tienen menos incidentes de acoso.",
            isTrue: true,
            explanation: "Verdadero. Los programas anti-bullying efectivos pueden reducir significativamente los incidentes de bullying en las escuelas."
        }
    ];
    
    // Variables para el juego de verdadero o falso
    let currentTF = 0;
    let tfScore = 0;
    let tfSelected = false;
    
    // Iniciar juego de verdadero o falso
    document.querySelector('[data-game="true-false"]').addEventListener('click', function() {
        document.getElementById('true-false-start').style.display = 'none';
        document.getElementById('true-false-play').style.display = 'block';
        
        // Configurar contadores
        document.getElementById('tf-total').textContent = trueFalseStatements.length;
        
        // Mostrar primera afirmación
        showTFStatement(0);
    });
    
    // Función para mostrar afirmación de verdadero o falso
    function showTFStatement(index) {
        currentTF = index;
        tfSelected = false;
        
        const statement = trueFalseStatements[index];
        document.getElementById('tf-current').textContent = index + 1;
        document.getElementById('tf-statement').textContent = statement.statement;
        
        // Resetear botones
        document.getElementById('btn-true').classList.remove('selected');
        document.getElementById('btn-false').classList.remove('selected');
        
        // Ocultar feedback y botón siguiente
        document.getElementById('tf-feedback').style.display = 'none';
        document.getElementById('tf-next').style.display = 'none';
        
        // Configurar handlers de botones
        document.getElementById('btn-true').onclick = function() { checkTFAnswer(true); };
        document.getElementById('btn-false').onclick = function() { checkTFAnswer(false); };
    }
    
    // Función para verificar respuesta de verdadero o falso
    function checkTFAnswer(userAnswer) {
        if (tfSelected) return; // Evitar múltiples selecciones
        
        tfSelected = true;
        const statement = trueFalseStatements[currentTF];
        
        // Marcar botón seleccionado
        if (userAnswer) {
            document.getElementById('btn-true').classList.add('selected');
        } else {
            document.getElementById('btn-false').classList.add('selected');
        }
        
        // Actualizar puntuación
        if (userAnswer === statement.isTrue) {
            tfScore += 10;
            document.getElementById('tf-score').textContent = tfScore;
        }
        
        // Mostrar retroalimentación
        const feedback = document.getElementById('tf-feedback');
        feedback.textContent = statement.explanation;
        feedback.style.display = 'block';
        
        // Mostrar botón para siguiente afirmación o finalizar
        const nextButton = document.getElementById('tf-next');
        if (currentTF < trueFalseStatements.length - 1) {
            nextButton.textContent = 'Siguiente Afirmación';
            nextButton.onclick = function() {
                showTFStatement(currentTF + 1);
            };
        } else {
            nextButton.textContent = 'Ver Resultados';
            nextButton.onclick = function() {
                endTFGame();
            };
        }
        nextButton.style.display = 'inline-block';
    }
    
    // Función para finalizar juego de verdadero o falso
    function endTFGame() {
        document.getElementById('true-false-play').style.display = 'none';
        document.getElementById('true-false-result').style.display = 'block';
        document.getElementById('tf-final-score').textContent = tfScore;
        
        // Mensaje según puntuación
        const messageElement = document.getElementById('tf-message');
        if (tfScore >= 80) {
            messageElement.innerHTML = '<p>¡Excelente!  Sabes diferenciar muy bien los hechos sobre el bullying. Tu conocimiento puede ayudar a prevenir situaciones de acoso.</p>';
        } else if (tfScore >= 50) {
            messageElement.innerHTML = '<p>¡Buen trabajo! Conoces varios hechos sobre el bullying, pero hay algunas áreas donde podrías aprender más. ¡Sigue explorando!</p>';
        } else {
            messageElement.innerHTML = '<p>¡Gracias por participar! Hay algunas ideas sobre el bullying que podrían no estar claras. Te animamos a revisar las otras secciones para aprender más.</p>';
        }
    }
    
    // Reiniciar juego de verdadero o falso
    document.querySelector('[data-game="true-false"].restart-btn').addEventListener('click', function() {
        currentTF = 0;
        tfScore = 0;
        document.getElementById('tf-score').textContent = tfScore;
        document.getElementById('true-false-result').style.display = 'none';
        document.getElementById('true-false-play').style.display = 'block';
        showTFStatement(0);
    });
    
    // ================= JUEGO DE SITUACIONES =================
    
    // Situaciones para el juego
    const situations = [
        {
            scenario: "Ves a un grupo de estudiantes que constantemente excluyen a un compañero de clase y hacen comentarios negativos sobre él cuando pasa cerca.",
            options: [
                "No haces nada, no es asunto tuyo",
                "Te ríes de los comentarios para encajar con el grupo",
                "Invitas al estudiante excluido a unirse a tu grupo de amigos y le brindas apoyo",
                "Comentas la situación con otros compañeros pero no tomas acción"
            ],
            bestOption: 2,
            feedback: "Incluir a quien está siendo excluido y brindarle apoyo es una excelente manera de combatir este tipo de bullying social. Demuestras empatía y ayudas a crear un ambiente más inclusivo."
        },
        {
            scenario: "Descubres que alguien ha creado una cuenta falsa en redes sociales para burlarse de otro estudiante, compartiendo fotos modificadas y comentarios hirientes.",
            options: [
                "Ignoras la situación porque ocurre en línea y no en persona",
                "Informas a un adulto de confianza sobre la cuenta y ofreces apoyo a quien está siendo afectado",
                "Le dices a la víctima que no debería tomárselo tan en serio",
                "Sigues la cuenta para ver qué publican, pero sin participar activamente"
            ],
            bestOption: 1,
            feedback: "Informar a un adulto sobre situaciones de cyberbullying es crucial. Este tipo de acoso puede ser particularmente dañino debido a su amplio alcance y permanencia en línea. Tu acción ayuda a detenerlo."
        },
        {
            scenario: "Un compañero de clase constantemente te pide tu tarea para copiarla, amenazando con excluirte del grupo si no lo haces.",
            options: [
                "Siempre le das tu tarea para evitar problemas",
                "Le dices que no de manera asertiva y hablas con un profesor si las amenazas continúan",
                "Le das respuestas incorrectas para que aprenda la lección",
                "Le gritas frente a todos para humillarlo"
            ],
            bestOption: 1,
            feedback: "Establecer límites de manera asertiva y buscar ayuda si las amenazas continúan es la mejor opción. No debes ceder ante la intimidación, pero tampoco responder con agresión o venganza."
        },
        {
            scenario: "Observas que un estudiante más grande está intimidando físicamente a uno más pequeño, empujándolo y quitándole sus pertenencias.",
            options: [
                "Te alejas rápidamente para no meterte en problemas",
                "Te unes al intimidador para no convertirte en su próximo objetivo",
                "Interfieres directamente y te enfrentas físicamente al intimidador",
                "Buscas a un profesor o adulto cercano inmediatamente para reportar la situación"
            ],
            bestOption: 3,
            feedback: "Buscar ayuda de un adulto es la opción más segura cuando hay intimidación física. No debes ponerte en riesgo, pero tampoco debes ignorar la situación."
        },
        {
            scenario: "Te das cuenta de que has estado haciendo comentarios que han herido los sentimientos de un compañero, aunque no era tu intención lastimarlo.",
            options: [
                "Ignoras la situación, seguro se le pasará",
                "Le dices que es demasiado sensible y que aprenda a aceptar bromas",
                "Le ofreces una disculpa sincera, reconoces el daño causado y cambias tu comportamiento",
                "Esperas a que él se disculpe contigo por malinterpretar tus comentarios"
            ],
            bestOption: 2,
            feedback: "Ofrecer una disculpa sincera y cambiar el comportamiento muestra madurez y empatía. Reconocer cuando hemos herido a alguien, aunque no fuera nuestra intención, es parte importante de construir relaciones respetuosas."
        }
    ];
    
    // Variables para el juego de situaciones
    let currentSituation = 0;
    let sitScore = 0;
    let sitSelected = false;
    
    // Iniciar juego de situaciones
    document.querySelector('[data-game="situations"]').addEventListener('click', function() {
        document.getElementById('situations-start').style.display = 'none';
        document.getElementById('situations-play').style.display = 'block';
        
        // Configurar contadores
        document.getElementById('sit-total').textContent = situations.length;
        
        // Mostrar primera situación
        showSituation(0);
    });
    
    // Función para mostrar situación
    function showSituation(index) {
        currentSituation = index;
        sitSelected = false;
        
        const situation = situations[index];
        document.getElementById('sit-current').textContent = index + 1;
        document.getElementById('sit-scenario').textContent = situation.scenario;
        
        // Crear opciones
        const optionsContainer = document.getElementById('sit-options');
        optionsContainer.innerHTML = '';
        
        situation.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.dataset.index = i;
            
            button.addEventListener('click', function() {
                if (sitSelected) return; // Evitar múltiples selecciones
                
                sitSelected = true;
                const selectedIndex = parseInt(this.dataset.index);
                
                // Marcar opción seleccionada
                document.querySelectorAll('.option-btn').forEach((btn, btnIndex) => {
                    if (btnIndex === selectedIndex) {
                        btn.classList.add('selected');
                    }
                    
                    if (btnIndex === situation.bestOption) {
                        btn.classList.add('correct');
                    } else if (btnIndex === selectedIndex) {
                        btn.classList.add('incorrect');
                    }
                });
                
                // Evaluar respuesta
                if (selectedIndex === situation.bestOption) {
                    sitScore += 20; // Más puntos por situación debido a que hay menos preguntas
                    document.getElementById('sit-score').textContent = sitScore;
                }
                
                // Mostrar retroalimentación
                const feedback = document.getElementById('sit-feedback');
                feedback.textContent = situation.feedback;
                feedback.style.display = 'block';
                
                // Mostrar botón para siguiente situación o finalizar
                const nextButton = document.getElementById('sit-next');
                if (currentSituation < situations.length - 1) {
                    nextButton.textContent = 'Siguiente Situación';
                    nextButton.onclick = function() {
                        showSituation(currentSituation + 1);
                        feedback.style.display = 'none';
                        nextButton.style.display = 'none';
                    };
                } else {
                    nextButton.textContent = 'Ver Resultados';
                    nextButton.onclick = function() {
                        endSituationGame();
                    };
                }
                nextButton.style.display = 'inline-block';
            });
            
            optionsContainer.appendChild(button);
        });
    }
    
    // Función para finalizar juego de situaciones
    function endSituationGame() {
        document.getElementById('situations-play').style.display = 'none';
        document.getElementById('situations-result').style.display = 'block';
        document.getElementById('sit-final-score').textContent = sitScore;
        
        // Mensaje según puntuación
        const messageElement = document.getElementById('sit-message');
        if (sitScore >= 80) {
            messageElement.innerHTML = '<p>¡Excelente trabajo! Demuestras gran criterio para tomar decisiones en situaciones de bullying. Tus acciones pueden hacer una diferencia real en la vida de quienes sufren acoso.</p>';
        } else if (sitScore >= 40) {
            messageElement.innerHTML = '<p>¡Buen intento! Has tomado algunas buenas decisiones, pero hay situaciones donde podrías mejorar tu respuesta. Recuerda que tus acciones pueden tener un gran impacto.</p>';
        } else {
            messageElement.innerHTML = '<p>Gracias por participar. Reflexiona sobre las respuestas correctas y cómo podrías actuar en situaciones reales similares. Cada acción positiva cuenta en la lucha contra el bullying.</p>';
        }
    }
    
    // Reiniciar juego de situaciones
    document.querySelector('[data-game="situations"].restart-btn').addEventListener('click', function() {
        currentSituation = 0;
        sitScore = 0;
        document.getElementById('sit-score').textContent = sitScore;
        document.getElementById('situations-result').style.display = 'none';
        document.getElementById('situations-play').style.display = 'block';
        showSituation(0);
    });
});
