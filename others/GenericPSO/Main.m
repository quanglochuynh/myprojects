clear;
clearvars;
clc;
close all;

best_value = inf;
cost = [];

for i = 1:30
    result(i) = get_PSO(20, 500);
    cost(i) = result(i).cost;
    if best_value > result(end).cost
        best_value = result(end).cost;
        best_id = i;
    end
    disp(['Iteration ' num2str(i) ': ' num2str(result(i).cost)]);
end

plot(cost);

disp(['Smallest value is ' num2str(best_value)]);
disp(['Where A = ' num2str(result(best_id).value(1))...
    '; B = ' num2str(result(best_id).value(2))...
    '; C = ' num2str(result(best_id).value(3))...
    '; D = ' num2str(result(best_id).value(4))]);





