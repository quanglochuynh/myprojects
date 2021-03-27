const
	fi='sudoku.txt';
	fo='result.txt';
    root:array[1..9] of shortint =(1,4,7,28,31,34,55,58,61);
var
    f:text;
	desk:array[1..9,1..9] of shortint;
	line:array[1..81] of shortint;
	visit:array[1..81] of boolean;
	n:shortint;

Procedure docfile;
	var
		i,j,k:shortint;
	Begin
		assign(f,fi);reset(f);
		k:=0;
		n:=0;
		for i:=1 to 9 do
			Begin
				for j:=1 to 9 do
					begin
						inc(k);
						read(f,line[k]);
						desk[i,j]:=line[k];
						if line[k]<>0 then
						begin
							visit[k]:=true;
							inc(n);
						end
						else visit[k]:=false;
					end;
				readln(f);
			end;
		close(f);
	end;

Procedure init;
	begin

	end;

Function PositionX(i:shortint):shortint;
begin
        if (i mod 9 = 0) then exit((i mod 9)+9 );
	exit(i mod 9);
end;

Function PositionY(i:shortint):shortint;
begin
        if (i mod 9 = 0) then exit(i div 9);
	exit((i div 9)+1);
end;

Function squaretest(x,v:shortint):boolean;
	var a,b,c,d,e,i,j:shortint;
	begin
		if ((x mod 9) = 0) then
			begin
				a:=x div 9;
				b:=(x mod 9) + 9;
			end
		else
			begin
				a:=(x div 9)+1;
				b:=x mod 9;
			end;
		if ((a mod 3) = 0) then c:=a div 3
		else c:=(a div 3) + 1;
		if ((b mod 3) = 0) then d:=b div 3
		else d:=(b div 3) + 1;
		e:=(c-1)*3+d;
		for i:=0 to 2 do
			for j:=0 to 2 do
				begin
					if desk[PositionY(root[e])+i,PositionX(root[e])+j]=v then exit(false);
				end;	//CO TRUNG NHAU
		exit(true);	//KO TRUNG NHAU
	end;


Function test(o,v:shortint):boolean;
	var i,x,y:shortint;
	begin
		y:=PositionY(o);
		x:=PositionX(o);
		for i:=1 to 9 do 	//horizontal
            if (desk[i,x]=v) then exit(false);

		for i:=1 to 9 do 	//vertical
			if (desk[y,i]=v) then exit(false);

		exit(squaretest(o,v));
	end;

Procedure print;
	var
		i,j,k:shortint;
		f:text;
	Begin
		assign(f,fo);rewrite(f);
		k:=0;
		for i:=1 to 9 do
			Begin
				for j:=1 to 9 do
					write(f,desk[i,j],' ');
				writeln(f);
			end;
        close(f);
	end;

Procedure Try(i:shortint); 	//thu tu
	var j,x,y:shortint;
        b:boolean;
	begin
		if  (i=82) then begin print; halt; end
		else
		if (visit[i]=true) then Try(i+1)
		else
			begin
				x:=PositionX(i);
				y:=PositionY(i);
				for j:=1 to 9 do
					begin
            b:=test(i,j);
						if (b=true) then
						begin
							line[i]:=j;
							desk[y,x]:=j;
							visit[i]:=true;
							inc(n);
              Try(i+1);
							dec(n);
							visit[i]:=false;
							desk[y,x]:=0;
							line[i]:=0;
						end;
					end;
			end;
	end;

Begin
	docfile;
	Try(1);
end.
