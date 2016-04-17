<html>
<head>
  <title>Perfil</title>
  <meta charset="utf-8"/>
  <link href="css/global.css" type="text/css" rel="stylesheet"/>
  <!--<link href="css/tooltip.css" type="text/css" rel="stylesheet"/>-->
  <link href="css/profile.css" type="text/css" rel="stylesheet"/>
  <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
  <script src="js/library/jquery.js" type="text/javascript"></script>
  <script src="js/library/tooltip.js" type="text/javascript"></script>
  <script src="js/library/crop.js" type="text/javascript"></script>
  <script src="js/profile.js" type="text/javascript"></script>
  <script src="js/data.js" type="text/javascript"></script>
</head>
<body>

  <table class="screen" cellspacing="0" cellpadding="0">

    <!--Top Bar-->

    <tr height="50px" class="sized">
      <td>
        <table class="topbar nsel">
          <tr>
            <td align="left" width="35%"><img class="logo" src="img/logo_mini.png"></img></td>
            <td align="right"><img class="lupa" src="img/lupa.png"></img></td>
            <td align="left"><input class="searchbar" type="text" placeholder="Buscar amigos o bandas"/></td>
            <td align="right" width="20px"><div class="notifCounter">1</div></td>
            <td align="left" width="40px" style="position:relative">
              <div style="top:45px;right:31px;z-index:200" class="arrow-up noti"></div>
              <img class="bell" src="img/bell.png">
                <div class="notifications noti">
                  <div class="notifTitle">Notificaciones</div>
                  <div class="contacto" style="background:#FFF">
                    <img class="contactImage" src="img/nouser.png"></img>
                    <div class="contactName">Paul McCartney</div>
                    <div class="contactMessage" style="color:#000">Te ha enviado una solicitud.</div>
                    <div class="agree">Aceptar</div>
                    <div class="disagree">Rechazar</div>
                  </div>
                <div class="contacto">
                  <img class="contactImage" src="img/diego.jpg"></img>
                  <div class="contactName">Diego Sandoval</div>
                  <div class="contactMessage">Ha aceptado tu solicitud.</div>
                </div>
                </div>
              </img></td>
            <td align="left" width="6%"><div class="userName">Eduardo</div></td>
          </tr>
        </table>
      </td>
    </tr>

    <!--Middle Bar-->

    <tr>
      <td valign="top" style="overflow-y:auto">
        <div style="height:100%;width:100%;height:calc(100vh - 50px);overflow:hidden;">
          <table style="height:100%;width:100%" cellspacing="0" cellpadding="0">
            <tr>

              <!--Left-->

              <td class="sized" valign="top" align="center" width="800px" style=";max-height:calc(100vh - 50px);min-width:800px;max-width:800px;overflow-y:auto;">
                <table class="nsel" style="height:100%;width:800px" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="40%">
                      <div style="width:100%;height:0px;background:#FFF"></div>
                      <table class="profile" style="box-shadow:0px 0px 2px 2px #EEE;" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="30%" align="center" valign="bottom">
                            <img class="userphoto" src="img/perfil.png"></img><br>
                          </td>
                          <td width="70%" align="right" valign="bottom">
                            <div class="portada">
                              <div class="button ped portSave" style="position:absolute;right:100px;bottom:10px;display:none">Cambiar</div>
                              <div class="cancelButton ped portCancel" style="position:absolute;right:10px;bottom:10px;display:none">Cancelar</div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="position:relative;height:40px;color:#FFF;">
                      <div style="top:0;left:-2px;position:absolute;background:#444;width:804px;box-shadow:0px 0px 1px 1px #444;border-radius:1px">
                        <table style="width:100%;position:relative" cellspacing="0" cellpadding="0">
                          <tr>
                            <td><div class="t3" style="color:#FFF;margin:8px">
                                  <b>Paul McCartney</b>
                                  <span style="color:#333;font-size:20px">|</span>
                                  Valdivia
                                  <span style="color:#333;font-size:20px">|</span>
                                  Hombre
                                  <span style="color:#333;font-size:20px">|</span>
                                  19
                                </div>
                              </td>
                            <td align="right" style="position:relative" >
                              <!--
                              <input style="margin-right:5px" class="button t3" type="button" value="Mensaje"/>
                              <input style="margin-right:5px" class="button t3" type="button" value="Añadir"/>
                              -->
                              <img src="img/biggear.png" class="biggear">
                                <div class="biggearlist">
                                  <div class="arrow-up" style="top:-7px;right:5px;"></div>
                                  <div class="biggeartitle">Cambiar</div>
                                  <div class="biggeartab showpersonalinfo">Información personal</div>
                                  <div class="biggeartab profileUploader">Foto de perfil</div>
                                  <div class="biggeartab portadaUploader">Foto de portada</div>
                                </div>
                              </img>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td height="100%" valign="top">
                      <center>
                        <table cellspacing="0" cellpadding="0" width="100%" style="overflow-y:scroll;position:relative;margin-top:20px;margin-bottom:50px;font-size:13px;overflow-y:scroll">
                          <tr class="sep"><td>Mi mensaje<img class="gear ed1 messageGear" src="img/gear.png"></img></td></tr>
                          <tr><td><div class="bar gustos">Busco músicos para formar banda de pop/rock y componer nuestros propio temas.</div></td></tr>
                          <tr class="sep"><td>Toco<img class="gear ed2 instrumentsGear" src="img/gear.png"></img></td></tr>
                          <tr>
                            <td>
                              <div class="bar">
                                <img class="instrument" tooltip="Acoredeon" src="img/instruments/4.png"></img>
                                <img class="instrument" tooltip="Guitarra" src="img/instruments/5.png"></img>
                                <img class="instrument" tooltip="Bajo" src="img/instruments/6.png"></img>
                                <img class="instrument" tooltip="Piano" src="img/instruments/7.png"></img>
                              </div>
                            </td>
                          </tr>
                          <tr class="sep"><td>Mis estilos<img class="gear ed3 stylesGear" src="img/gear.png"></img></td></tr>
                          <tr>
                            <td>
                              <div class="bar">
                                <div class="estilo">Rock</div>
                                <div class="estilo">Pop</div>
                                <div class="estilo">Clásica</div>
                                <div class="estilo">Electrónica</div>
                              </div>
                            </td>
                          </tr>
                          <tr class="sep"><td>Mis influencias<img class="gear ed4 influencesGear" src="img/gear.png"></img></td></tr>
                          <tr>
                            <td>
                              <div class="bar">
                                <div class="bandas">The Beatles</div>
                                <div class="bandas">Pink Floyd</div>
                                <div class="bandas">Queen</div>
                                <div class="bandas">Paul McCartney</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </center>
                    </td>
                  </tr>
                </table>
              </td>

              <!--Separador-->

              <td style="min-width:10px" width="10px"></td>

              <!--Right-->

              <td width="350px" align="right" class="sized">
                <div style="background:#F2F2F2;width:330px;height:100%;box-shadow:0px 0px 10px 1px #999;">
                  <table cellspacing="0" cellpadding="0" style="width:100%;height:100%">

                    <tr>
                      <td>
                        <div style="height:45px;width:100%;background:#4D4D4D;position:relative;">
                          <img class="lupa" style="margin:14px;" src="img/lupa.png"></img>
                          <input type="text" style="position:relative;top:-15px;left:-7px;font-size:18px;background:none;height:100%;width:280px;border:none;outline:none;color:#DDD" placeholder="Buscar"/>
                          <!--<input style="font-size:20px;width:93%;margin-top:13px" type="search" placeholder="Contactos"/>-->
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="height:100%">
                        <div class="contactos">

                          <div class="contacto">
                            <img class="contactImage" src="img/nouser.png"></img>
                            <div class="contactName">Paul McCartney <span class="contactStatus"></span></div>
                            <div class="contactMessage">. . . Love is all you need boy</div>
                            <div class="contactCounter">3</div>
                          </div>
                          <div class="contacto">
                            <img class="contactImage" src="img/diego.jpg"></img>
                            <div class="contactName">Diego Sandoval <span class="contactStatus"></span></div>
                            <div class="contactMessage">. . . cuando nos juntamos?</div>
                          </div>

                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div class="chat">

                          <div class="chatTopBar">

                            <div class="chatState"></div>
                            <div class="chatName">Paul McCartney</div>
                            <img class="chatClose" src="img/close.png"></img>

                          </div>
                          <div class="chatMessages">

                            <div class="chatMessageA">
                              <span>HELLO?</span>
                            </div>

                            <div class="chatMessageA">
                              <span>Hey! How are you?</span>
                            </div>

                            <div class="chatMessageA">
                              <span>I'm fine thanks! You?</span>
                            </div>

                            <div class="chatMessageB">
                              <div class="mess">El otro dia me encontre con un wn super agresivo wn, estaba muy enojado porque no lo dejaron ir a la fiesta del manjarsh</div>
                            </div>

                            <div class="chatMessageA">
                              <span>HELLO?</span>
                            </div>

                            <div class="chatMessageA">
                              <span>Hey! How are you?</span>
                            </div>

                            <div class="chatMessageA">
                              <span>I'm fine thanks! You?</span>
                            </div>

                            <div class="chatMessageB">
                              <div class="mess">El otro dia me encontre con un wn super agresivo wn, estaba muy enojado porque no lo dejaron ir a la fiesta del manjarsh asd as das d dsdadsda asda sdasdas  as d asd as da sd as da sd as da s    asdasdasdasd asdasdasd asdasd asdasdasd asdasdas dasdasda sdasda sdasda dsdasd as</div>
                              <div class="visto">Visto</div>
                            </div>

                          </div>
                          <div class="chatBottomBar">
                            <input class="chatInput" type="text" />
                          </div>

                        </div>
                      </td>
                    </tr>
                  </table>
              </td>

            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
  <!--Informacion personal editor-->
  <div class="darkbackground personalinfo">
    <div class="infowindow sized">
      <table>
        <tr>
          <td class="inftit">Nombre:</td>
          <td class="infdata" width="250px"><span class="inf1 sA">Eduardo</span><input style="display:none" class="editBox chan1 sB" type="text"/></td>
          <td width="150px">
            <input class="editButton button edit1 sA" type="button" value="Editar"/>
            <input style="display:none" class="saveButton save1 sB" type="button" value="Guardar"/>
            <input style="display:none" class="cancelButton can1 sB" type="button" value="Cancelar"/>
          </td>
        </tr>
        <tr>
          <td class="inftit">Apellido:</td>
          <td class="infdata"><span class="inf2 sA">Hopperdietzel</span><input style="display:none" class="editBox chan2 sB" type="text"/></td>
          <td>
            <input class="editButton button edit2 sA" type="button" value="Editar"/>
            <input style="display:none" class="saveButton save2 sB" type="button" value="Guardar"/>
            <input style="display:none" class="cancelButton can2 sB" type="button" value="Cancelar"/>
          </td>
        </tr>
        <tr>
          <td class="inftit">Nacimiento:</td>
          <td class="infdata"><span class="inf3 sA">27/07/1996</span>
            <div style="display:none" class="chan3 sB">
              <select class="dia">
                <option value="1">01</option>
              </select>
              <select class="mes">
                <option value="1">Enero</option>
              </select>
              <select class="año">
                <option value="1996">1996</option>
              </select>
            </div>
          </td>
          <td>
              <input class="editButton button edit3 sA" type="button" value="Editar"/>
              <input style="display:none" class="saveButton save3 sB" type="button" value="Guardar"/>
              <input style="display:none" class="cancelButton can3 sB" type="button" value="Cancelar"/>
            </td>
        </tr>
        <tr>
          <td class="inftit">Sexo:</td>
          <td class="infdata"><span class="inf4 sA">Hombre</span><div class="chan4 sB" style="display:none"><input type="radio" name="gender" value="male" checked>Hombre<input type="radio" name="gender" value="female">Mujer</div></td>
          <td>
            <input class="editButton button edit4 sA" type="button" value="Editar"/>
            <input style="display:none" class="saveButton save4 sB" type="button" value="Guardar"/>
            <input style="display:none" class="cancelButton can4 sB" type="button" value="Cancelar"/>
          </td>
        </tr>
        <tr>
          <td class="inftit">Ciudad:</td>
          <td class="infdata"><span class="inf5 sA">Valdivia</span><input class="chan5 sB" style="display:none" type="text"></td>
          <td>
            <input class="editButton button edit5 sA" type="button" value="Editar"/>
            <input style="display:none" class="saveButton save5 sB" type="button" value="Guardar"/>
            <input style="display:none" class="cancelButton can5 sB" type="button" value="Cancelar"/>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <!--Photo editor-->
  <div class="darkbackground profilephotop">
    <div class="photowindow sized">
      <div class="container">
        <div class="imageBox">
            <div class="thumbBox"></div>
            <div class="spinner" style="display: none">Loading...</div>
        </div>
        <div class="action">
            <input type="file" id="file" style="display:none">
            <input type="button" class="saveButton" id="btnCrop" value="Guardar" style="float: right">
            <input type="button" class="cancelButton" id="btnCrop" value="Cancelar" style="float: right">
            <input type="button" class="editButton button" id="btnZoomIn" value="+" style="float: right">
            <input type="button" class="editButton button" id="btnZoomOut" value="-" style="float: right">
        </div>
      </div>
    </div>
  </div>
  <!--Message editor-->
  <div class="darkbackground messageeditor">
    <div class="messagewindow sized">
      <div style="font-size:15px;margin-top:10px;margin-bottom:20px">Añade tu mensaje:</div>
      <textarea style="width:400px;height:100px;border:1px solid #CCC;border-radius:7px;resize:none;margin-bottom:10px;outline:none;padding:7px"></textarea>
      <input type="button" class="saveButton" value="Guardar" style="float: left">
      <input type="button" class="cancelButton" value="Cancelar" style="float: left">
    </div>
  </div>
  <!--Instrumentos-->
  <div class="darkbackground instrumentseditor">
    <div class="instrumentswindow sized">
      <div style="font-size:18px;font-weight:bold;margin-top:10px;margin-bottom:20px">Selecciona los instrumentos que manejas:</div>
      <div id="instrumentsDisplay"></div>
      <input type="button" class="saveButton" value="Guardar cambios" style="float: left">
      <input type="button" class="cancelButton" value="Cancelar" style="float: left">
    </div>
  </div>
  <!--Estilos-->
  <div class="darkbackground styleseditor">
    <div class="instrumentswindow sized">
      <div style="font-size:18px;font-weight:bold;margin-top:10px;margin-bottom:20px">Selecciona tus estilos musicales:</div>
      <div id="stylesDisplay"></div>
      <input type="button" class="saveButton" value="Guardar cambios" style="float: left">
      <input type="button" class="cancelButton" value="Cancelar" style="float: left">
    </div>
  </div>
  <!--Influencias-->
  <div class="darkbackground influenceseditor">
    <div class="instrumentswindow sized">
      <div style="font-size:18px;font-weight:bold;margin-top:10px;margin-bottom:20px">Añade tus 4 influencias princpipales:</div>
      <ul >
        <li style="display:inline"><input type="text" placeholder="Ej: The Beatles" style="font-size:16px;padding:5px;border:solid 1px #CCC;border-radius:5px;outline:none;width:300px"/></li>
        <li style="display:inline"><input type="button" class="editButton button" value="Añadir"></li>
      </ul>
      <div id="influencesDisplay"></div>
      <input type="button" class="saveButton" value="Guardar cambios" style="float:left">
      <input type="button" class="cancelButton" value="Cancelar" style="float:left">
    </div>
  </div>
  <input id="portadaUploader" type="file" style="display:none">
</body>
</html>
